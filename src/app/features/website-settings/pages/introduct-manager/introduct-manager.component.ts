import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IntroductionService } from '../../services/introduction.service';
import { Introduction } from '../../models/introduction.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from '../../../../../environment/environment';
import { RawEditorOptions } from 'tinymce';

@Component({
  selector: 'app-introduct-manager',
  standalone: false,
  templateUrl: './introduct-manager.component.html',
  styleUrl: './introduct-manager.component.scss'
})
export class IntroductManagerComponent implements OnInit {
  introForm: FormGroup;
  loading = false;
  isEditing = false;
  introduction?: Introduction;
  imageUrl?: string;
  currentImageId?: number;

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

        fetch(`${environment.apiUrl}media/upload`, {
          method: 'POST',
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

  constructor(
    private fb: FormBuilder,
    private introductionService: IntroductionService,
    private message: NzMessageService
  ) {
    this.introForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      active: ['1', [Validators.required]],
      image: [null]
    });
  }

  ngOnInit() {
    this.loadIntroduction();
  }

  loadIntroduction() {
    this.loading = true;
    this.introductionService.getIntroduction().subscribe({
      next: (response) => {
        if (!response.meta.error) {
          this.introduction = response.data;
          // Reset form với dữ liệu mới
          this.introForm.reset({
            title: response.data.title,
            content: response.data.content,
            active: response.data.active.toString(),
            image: null
          });

          // Set image URL from Google Drive
          if (response.data.image?.drive_id) {
            this.imageUrl = `https://lh3.googleusercontent.com/d/${response.data.image.drive_id}`;
            this.currentImageId = response.data.image.id;
          } else {
            this.imageUrl = undefined;
            this.currentImageId = undefined;
          }
        }
      },
      error: (error) => {
        this.message.error('Có lỗi khi tải thông tin giới thiệu');
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    if (file) {
      const isImage = file.type?.startsWith('image/');
      if (!isImage) {
        this.message.error('Bạn chỉ có thể tải lên file hình ảnh!');
        return false;
      }
      const isLt2M = (file.size || 0) / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Hình ảnh phải nhỏ hơn 2MB!');
        return false;
      }

      this.handleImageChange(file as any);
    }
    return false;
  };

  handleImageChange(file: File) {
    this.introForm.patchValue({
      image: file
    });
    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFileChange(event: any) {
    if (event.type === 'success') {
      const file = event.file?.originFileObj;
      if (file) {
        this.handleImageChange(file);
      }
    }
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.loadIntroduction(); // Reset form to original data
  }

  onSubmit() {
    if (this.introForm.valid) {
      this.loading = true;
      const formValue = this.introForm.value;

      // Nếu không có ảnh mới, giữ nguyên ảnh cũ
      if (!formValue.image && this.currentImageId) {
        delete formValue.image;
      }

      this.introductionService.updateIntroduction(formValue).subscribe({
        next: (response) => {
          if (!response.meta.error) {
            this.message.success('Cập nhật thông tin giới thiệu thành công');
            this.isEditing = false;
            this.loadIntroduction();
          } else {
            this.message.error(response.meta.message || 'Có lỗi xảy ra');
          }
        },
        error: (error) => {
          this.message.error('Có lỗi khi cập nhật thông tin');
          console.error(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      Object.values(this.introForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
