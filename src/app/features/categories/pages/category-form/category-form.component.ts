import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryService, CategoryRequest } from '../../../../core/services/category.service';
import { IconService } from '../../../../core/services/icon.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isEdit = false;
  loading = false;
  categoryId?: number;
  iconList: string[] = [];
  filteredIcons: string[] = [];
  displayedIcons: string[] = [];
  selectedIcon: string = '';
  searchText: string = '';
  currentPage = 1;
  pageSize = 56;
  iconType: 'all' | 'ant' | 'material' = 'all';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private iconService: IconService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadIcons();
  }

  loadIcons(): void {
    switch (this.iconType) {
      case 'ant':
        this.iconList = this.iconService.getAntDesignIcons();
        break;
      case 'material':
        this.iconList = this.iconService.getMaterialIcons();
        break;
      default:
        this.iconList = this.iconService.getAllIcons();
    }
    this.filteredIcons = [...this.iconList];
    this.updateDisplayedIcons();
  }

  onIconTypeChange(type: 'all' | 'ant' | 'material'): void {
    this.iconType = type;
    this.currentPage = 1;
    this.loadIcons();
    this.filterIcons();
  }

  // Kiểm tra loại icon và trả về cấu trúc phù hợp
  getIconType(icon: string): { type: string, isMaterial: boolean } {
    return this.iconService.getIconType(icon);
  }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      icon: ['', [Validators.required]]
    });
  }

  checkEditMode(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.categoryId = +id;
      this.loadCategoryData();
    }
  }

  loadCategoryData(): void {
    if (!this.categoryId) return;

    this.loading = true;
    this.categoryService.getCategoryById(this.categoryId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (!response.meta.error && response.data) {
            const category = response.data;
            this.categoryForm.patchValue({
              name: category.name,
              slug: category.slug,
              icon: category.icon
            });
            this.selectedIcon = category.icon;
          } else {
            this.message.error('Không thể tải thông tin danh mục');
            this.router.navigate(['/categories']);
          }
        },
        error: (error) => {
          this.message.error('Có lỗi khi tải thông tin danh mục');
          console.error('Error:', error);
          this.router.navigate(['/categories']);
        }
      });
  }

  onSelectIcon(icon: string): void {
    this.selectedIcon = icon;
    this.categoryForm.patchValue({ icon });
  }

  filterIcons(): void {
    if (!this.searchText.trim()) {
      this.filteredIcons = [...this.iconList];
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredIcons = this.iconList.filter(icon =>
        icon.toLowerCase().includes(searchTerm)
      );
    }
    this.currentPage = 1;
    this.updateDisplayedIcons();
  }

  updateDisplayedIcons(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedIcons = this.filteredIcons.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedIcons();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.loading = true;
      const formData: CategoryRequest = this.categoryForm.value;

      const request$ = this.isEdit && this.categoryId
        ? this.categoryService.updateCategory(this.categoryId, formData)
        : this.categoryService.createCategory(formData);

      request$.pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response) => {
            if (!response.meta.error) {
              this.message.success(
                this.isEdit ? 'Cập nhật danh mục thành công!' : 'Thêm danh mục thành công!'
              );
              this.router.navigate(['/categories']);
            } else {
              this.message.error(response.meta.message || 'Thao tác thất bại!');
            }
          },
          error: (error) => {
            this.message.error('Có lỗi xảy ra khi thực hiện thao tác!');
            console.error('Error:', error);
          }
        });
    } else {
      Object.values(this.categoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
