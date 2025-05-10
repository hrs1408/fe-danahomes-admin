import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadXHRArgs, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';
import { TagService } from '../../../tags/services/tag.service';
import { CategoryService, CategoryResponse } from '../../services/category.service';
import { environment } from '../../../../../environment/environment';
import { RawEditorOptions } from 'tinymce';
import { Product, ProductRequest } from '../../models/product.model';
import { Observable, Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as L from 'leaflet';

interface CustomUploadFile extends NzUploadFile {
  isExisting?: boolean;
  originalData?: any;
}

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  productForm!: FormGroup;
  loading = false;
  isEdit = false;
  productId?: number;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  // Leaflet properties
  map!: L.Map;
  marker!: L.Marker;
  searchResults: any[] = [];
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  // Tags
  tags: { id: number; name: string; color: string }[] = [];

  // TinyMCE Config
  editorConfig: RawEditorOptions = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
    ],
    toolbar: 'undo redo | blocks | formatselect | bold italic | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | link image media | removeformat | help',
    height: 500,
    menubar: true,
    branding: false,
    language: 'vi',
    language_url: '/tinymce/langs/vi.js',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }',
    images_upload_handler: (blobInfo: any, progress: any): Promise<string> => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        const token = localStorage.getItem('access_token');

        fetch(`${environment.apiUrl}media/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })
          .then(response => response.json())
          .then(result => {
            if (result.data.drive_id) {
              resolve('https://lh3.googleusercontent.com/d/'+result.data.drive_id);
            } else {
              reject('Không nhận được URL ảnh từ server');
            }
          })
          .catch(error => {
            reject('Lỗi upload ảnh: ' + error);
          });
      });
    }
  };

  // Product type options
  typeProducts = [
    { label: 'Bán', value: 'sell' },
    { label: 'Cho thuê', value: 'rent' },
    { label: 'Cho thuê lại', value: 'sublease' }
  ];

  projectTypes = [
    { label: 'Căn hộ cao cấp', value: 'luxury_apartment' },
    { label: 'Khu đô thị', value: 'urban_area' },
    { label: 'Khu nghỉ dưỡng', value: 'resort' },
    { label: 'Khu phức hợp', value: 'complex' }
  ];

  projectStatus = [
    { label: 'Đang mở bán', value: 'selling' },
    { label: 'Sắp mở bán', value: 'coming_soon' },
    { label: 'Đã bàn giao', value: 'delivered' },
    { label: 'Đã hoàn thành', value: 'completed' }
  ];

  investmentTypes = [
    { label: 'Mua bán', value: 'buy_sell' },
    { label: 'Cho thuê', value: 'rent' },
    { label: 'Cho thuê lại', value: 'sublease' }
  ];

  // Thêm properties cho ảnh
  coverImageList: CustomUploadFile[] = [];
  productImageList: CustomUploadFile[] = [];

  // Thêm properties để lưu trữ file tạm thời
  tempCoverFile?: File;
  tempProductFiles: File[] = [];

  // Thêm property cho categories
  categories: { id: number; name: string }[] = [];

  // Thêm biến để theo dõi trạng thái ảnh
  existingCoverImage: any = null;
  existingProductImages: any[] = [];
  removedImageIds: number[] = [];

  // Thêm biến để lưu trữ danh sách dự án
  projects: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private tagService: TagService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private ngZone: NgZone,
    private categoryService: CategoryService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = +params['id'];
        this.isEdit = true;
      }
      this.initForm();
      if (this.isEdit) {
        this.loadProduct(this.productId!);
      }
    });

    // Khởi tạo map sau khi view đã được tạo
    setTimeout(() => {
      this.initMap();
    });

    // Subscribe to name changes to auto-generate slug
    this.productForm.get('name')?.valueChanges.subscribe(name => {
      if (!this.isEdit) {
        const slug = this.generateSlug(name);
        this.productForm.patchValue({ slug }, { emitEvent: false });
      }
    });

    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });

    // Load tags
    this.loadTags();

    // Load categories
    this.loadCategories();

    // Load danh sách dự án
    this.loadProjects();
  }

  initMap(): void {
    if (!this.mapContainer) return;

    // Initialize the map
    this.map = L.map(this.mapContainer.nativeElement, {
      attributionControl: false
    }).setView([16.0544, 108.2022], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© Danahomes',
    }).addTo(this.map);

    // Add marker
    this.marker = L.marker([16.0544, 108.2022], {
      draggable: true
    }).addTo(this.map);

    // Handle marker drag events
    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.reverseGeocode(position.lat, position.lng);
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  performSearch(query: string): void {
    if (!query) return;

    // Use Nominatim API for geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=vn`)
      .then(response => response.json())
      .then(data => {
        this.searchResults = data;
        if (data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);

          this.map.setView([lat, lon], 16);
          this.marker.setLatLng([lat, lon]);

          this.updateAddressDetails(result);
        } else {
          this.message.warning('Không tìm thấy địa chỉ');
        }
      })
      .catch(error => {
        this.message.error('Có lỗi xảy ra khi tìm kiếm địa chỉ');
      });
  }

  reverseGeocode(lat: number, lon: number): void {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .then(data => {
        this.updateAddressDetails(data);
      })
      .catch(error => {
        this.message.error('Có lỗi xảy ra khi lấy thông tin địa chỉ');
      });
  }

  updateAddressDetails(place: any): void {
    const address = place.address || {};
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    // Log để kiểm tra dữ liệu từ API
    console.log('Raw address data:', address);

    // Xử lý địa chỉ theo thứ tự ưu tiên cho Việt Nam
    const getProvince = () => {
      if (address.city === 'Đà Nẵng') return 'Thành phố Đà Nẵng';
      return address.city || address.state || '';
    };

    const getDistrict = () => {
      // Đối với Đà Nẵng, district thường nằm trong trường suburb
      if (address.suburb && address.suburb.includes('Ngũ Hành Sơn')) {
        return 'Quận Ngũ Hành Sơn';
      }
      // Các trường hợp khác
      return address.district ||
             (address.suburb && address.suburb.includes('Quận') ? address.suburb : '') ||
             address.city_district ||
             '';
    };

    const getWard = () => {
      // Đối với Đà Nẵng, ward có thể nằm trong quarter hoặc neighbourhood
      return address.quarter ||
             (address.neighbourhood && !address.neighbourhood.includes('Quận') ? address.neighbourhood : '') ||
             (address.suburb && !address.suburb.includes('Quận') ? address.suburb : '') ||
             '';
    };

    const addressDetailForm = this.productForm.get('address_detail');
    if (addressDetailForm) {
      const formValues = {
        address: place.display_name || '',
        province: getProvince(),
        district: getDistrict(),
        ward: getWard(),
        google_address_link: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`
      };

      // Log để kiểm tra kết quả mapping
      console.log('Mapped address values:', formValues);

      addressDetailForm.patchValue(formValues);

      // Cập nhật vị trí map và marker
      if (this.map && lat && lon) {
        this.map.setView([lat, lon], 16);
        this.marker.setLatLng([lat, lon]);
      }
    }
  }

  loadTags(): void {
    this.tagService.getAllTags().subscribe({
      next: (response) => {
        this.tags = response.data;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải danh sách tags');
      }
    });
  }

  generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  }

  priceRangeValidator(control: AbstractControl): ValidationErrors | null {
    const price = control.get('price')?.value;
    const priceTo = control.get('price_to')?.value;

    if (price && priceTo && price >= priceTo) {
      return { priceRange: true };
    }

    return null;
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: CategoryResponse) => {
        this.categories = response.data;
      },
      error: (error: any) => {
        this.message.error('Có lỗi xảy ra khi tải danh sách danh mục');
      }
    });
  }

  updateValidators(): void {
    const coverImageControl = this.productForm.get('cover_image');
    const productImagesControl = this.productForm.get('product_images');

    if (this.isEdit) {
      coverImageControl?.clearValidators();
      productImagesControl?.clearValidators();
    } else {
      coverImageControl?.setValidators([Validators.required]);
      productImagesControl?.setValidators([Validators.required, Validators.minLength(1)]);
    }

    coverImageControl?.updateValueAndValidity();
    productImagesControl?.updateValueAndValidity();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
      category_id: [null, [Validators.required]],
      product_parent_id: [null],
      address_detail: this.fb.group({
        address: ['', [Validators.required, Validators.minLength(10)]],
        province: ['', [Validators.required]],
        district: ['', [Validators.required]],
        ward: ['', [Validators.required]],
        google_address_link: ['', [Validators.required, Validators.pattern(/^https?:\/\/.*/)]],
      }),
      product_detail: this.fb.group({
        bedroom: [0, [Validators.required, Validators.min(0)]],
        bathroom: [0, [Validators.required, Validators.min(0)]],
        area: [0, [Validators.required, Validators.min(0)]],
        price: [0, [Validators.required, Validators.min(0)]],
        price_to: [0, [Validators.required, Validators.min(0)]],
        content: ['', [Validators.required, Validators.minLength(100)]],
        type_product: ['', [Validators.required]],
        investor: ['', [Validators.required, Validators.minLength(3)]],
        project_type: ['', [Validators.required]],
        project_status: ['', [Validators.required]],
        type_of_investment: [''],
        eletric_price: [0, [Validators.min(0)]],
        water_price: [0, [Validators.min(0)]],
        internet_price: [0, [Validators.min(0)]],
        utilities: [''],
        interiol: ['']
      }, { validators: this.priceRangeValidator }),
      tag_ids: [[], [Validators.required, Validators.minLength(1)]],
      cover_image: [null],
      product_images: [[]]
    });

    // Thêm validator cho category_id khi có product_parent_id
    this.productForm.get('product_parent_id')?.valueChanges.subscribe(value => {
      const categoryControl = this.productForm.get('category_id');
      if (value) {
        categoryControl?.addValidators(this.categoryValidator.bind(this));
      } else {
        categoryControl?.removeValidators(this.categoryValidator.bind(this));
      }
      categoryControl?.updateValueAndValidity();
    });

    this.updateValidators();
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        const product = response.data;

        // Cập nhật form với dữ liệu sản phẩm
        this.productForm.patchValue({
          name: product.name,
          slug: product.slug,
          category_id: product.category_id,
          product_parent_id: product.product_parent_id,
          address_detail: product.address_detail,
          product_detail: product.product_detail,
          tag_ids: product.tag?.map(tag => tag.id) || []
        });

        // Cập nhật vị trí trên bản đồ từ google_address_link
        const addressLink = product.address_detail.google_address_link;
        if (addressLink && this.map) {
          const matches = addressLink.match(/mlat=([\d.]+)&mlon=([\d.]+)/);
          if (matches) {
            const lat = parseFloat(matches[1]);
            const lon = parseFloat(matches[2]);

            // Cập nhật vị trí map và marker
            this.map.setView([lat, lon], 16);
            this.marker.setLatLng([lat, lon]);

            // Cập nhật searchQuery để hiển thị trong ô tìm kiếm
            this.searchQuery = product.address_detail.address;
          }
        }

        // Xử lý ảnh
        if (product.images?.length) {
          // Lọc ảnh bìa
          const coverImage = product.images.find(img => img.file_type === 'cover');
          if (coverImage) {
            this.existingCoverImage = coverImage;
            this.coverImageList = [{
              uid: coverImage.id.toString(),
              name: coverImage.file_name,
              status: 'done',
              url: `https://lh3.googleusercontent.com/d/${coverImage.drive_id}`,
              isExisting: true,
              originalData: coverImage
            }];
          }

          // Lọc ảnh sản phẩm
          const productImages = product.images.filter(img => img.file_type === 'product');
          if (productImages.length) {
            this.existingProductImages = productImages;
            this.productImageList = productImages.map(img => ({
              uid: img.id.toString(),
              name: img.file_name,
              status: 'done',
              url: `https://lh3.googleusercontent.com/d/${img.drive_id}`,
              isExisting: true,
              originalData: img
            }));
          }
        }

        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải thông tin sản phẩm');
        this.loading = false;
      }
    });
  }

  beforeUploadCover = (file: NzUploadFile): boolean => {
    this.coverImageList = [file];
    this.tempCoverFile = file as any;

    // Cập nhật form control
    this.productForm.patchValue({
      cover_image: file
    });

    // Tạo URL preview cho file
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    return false;
  };

  beforeUploadProductImages = (file: NzUploadFile): boolean => {
    this.productImageList = [...this.productImageList, file];
    this.tempProductFiles.push(file as any);

    // Cập nhật form control
    const currentImages = this.productForm.get('product_images')?.value || [];
    this.productForm.patchValue({
      product_images: [...currentImages, file]
    });

    return false;
  };

  handleRemoveCover = (file: NzUploadFile): boolean => {
    return this.onRemoveImage(file as CustomUploadFile, 'cover');
  };

  handleRemoveProduct = (file: NzUploadFile): boolean => {
    return this.onRemoveImage(file as CustomUploadFile, 'product');
  };

  onRemoveImage = (file: CustomUploadFile, type: 'cover' | 'product'): boolean => {
    if (file.isExisting) {
      const imageId = parseInt(file.uid);
      if (!isNaN(imageId)) {
        this.removedImageIds.push(imageId);
      }
    }

    if (type === 'cover') {
      this.coverImageList = [];
      this.productForm.patchValue({ cover_image: null });
    } else {
      const index = this.productImageList.indexOf(file);
      this.productImageList = this.productImageList.filter(item => item.uid !== file.uid);

      // Cập nhật lại form control product_images
      const currentFiles = this.productForm.get('product_images')?.value || [];
      const updatedFiles = [...currentFiles];
      updatedFiles.splice(index, 1);
      this.productForm.patchValue({ product_images: updatedFiles });
    }

    return true;
  };

  async onSubmit(): Promise<void> {
    console.log(this.productForm); //please do not remove this line
    if (this.productForm.valid) {
      this.loading = true;
      try {
        const formValue = this.productForm.value;

        // Format dữ liệu theo đúng cấu trúc API yêu cầu
        const requestData = {
          name: formValue.name,
          slug: formValue.slug,
          category_id: formValue.category_id || 0,
          product_parent_id: formValue.product_parent_id || null,
          address_detail: {
            address: formValue.address_detail.address,
            province: formValue.address_detail.province,
            district: formValue.address_detail.district,
            ward: formValue.address_detail.ward,
            google_address_link: formValue.address_detail.google_address_link
          },
          product_detail: {
            bedroom: formValue.product_detail.bedroom,
            bathroom: formValue.product_detail.bathroom,
            area: formValue.product_detail.area,
            price: formValue.product_detail.price,
            price_to: formValue.product_detail.price_to,
            content: formValue.product_detail.content,
            type_product: formValue.product_detail.type_product,
            investor: formValue.product_detail.investor,
            project_type: formValue.product_detail.project_type,
            project_status: formValue.product_detail.project_status,
            type_of_investment: formValue.product_detail.type_of_investment || '',
            eletric_price: formValue.product_detail.eletric_price || 0,
            water_price: formValue.product_detail.water_price || 0,
            internet_price: formValue.product_detail.internet_price || 0,
            utilities: formValue.product_detail.utilities || '',
            interiol: formValue.product_detail.interiol || ''
          },
          tag_ids: formValue.tag_ids
        };

        let response;

        // 1. Create/Update product first
        if (this.isEdit && this.productId) {
          response = await this.productService.updateProduct(this.productId, requestData).toPromise();
          this.message.success('Cập nhật sản phẩm thành công');
        } else {
          response = await this.productService.createProduct(requestData).toPromise();
          this.message.success('Tạo sản phẩm thành công');
        }

        // 2. Upload images if product was created/updated successfully
        const productDetailId = response?.data?.product_detail?.id;
        if (!productDetailId) {
          throw new Error('Không nhận được product_detail_id từ server');
        }

        try {
          // Xóa các ảnh đã đánh dấu để xóa
          if (this.removedImageIds.length > 0) {
            const deletePromises = this.removedImageIds.map(imageId =>
              this.productService.deleteImage(imageId, this.existingCoverImage?.drive_id).toPromise()
            );
            await Promise.all(deletePromises);
          }

          // Upload cover image nếu có ảnh mới
          if (this.tempCoverFile) {
            await this.productService.uploadImage(this.tempCoverFile, 'cover', productDetailId).toPromise();
          }

          // Upload product images mới
          if (this.tempProductFiles.length > 0) {
            const uploadPromises = this.tempProductFiles.map(file =>
              this.productService.uploadImage(file, 'product', productDetailId).toPromise()
            );
            await Promise.all(uploadPromises);
          }
        } catch (error) {
          this.message.warning('Sản phẩm đã được tạo nhưng có lỗi khi tải ảnh lên');
          console.error('Upload image error:', error);
        }

        this.router.navigate(['/products']);
      } catch (error: any) {
        this.message.error('Có lỗi xảy ra: ' + (error.error?.message || error.message || 'Vui lòng thử lại'));
      } finally {
        this.loading = false;
      }
    } else {
      Object.values(this.productForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      this.message.warning('Vui lòng điền đầy đủ thông tin bắt buộc');
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  formatterVND = (value: number): string => {
    if (!value) return '0';
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ`;
  };

  parserVND = (value: string): number => {
    if (!value) return 0;
    return Number(value.replace(/[^\d]/g, ''));
  };

  // Thêm validator cho category_id
  categoryValidator(control: AbstractControl): ValidationErrors | null {
    const categoryId = control.value;
    const productParentId = this.productForm.get('product_parent_id')?.value;

    if (productParentId && categoryId === 7) {
      return { invalidCategory: true };
    }
    return null;
  }

  // Thêm phương thức load danh sách dự án
  loadProjects(): void {
    this.productService.getProductByProject().subscribe({
      next: (response) => {
        if (response.data) {
          this.projects = response.data;
        }
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải danh sách dự án');
      }
    });
  }
}
