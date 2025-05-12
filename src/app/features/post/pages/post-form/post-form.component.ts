import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { PostService } from '../../services/post.service';
import { environment } from '../../../../../environment/environment';
import { RawEditorOptions } from 'tinymce';
@Component({
  selector: 'app-post-form',
  standalone: false,
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  loading = false;
  isEdit = false;
  postId: number | null = null;
  imageUrl: string | null = null;
  fileList: NzUploadFile[] = [];

  postTypes = [
    { label: 'Tin tức', value: 'news' },
    { label: 'Tin nổi bật', value: 'featured' },
    { label: 'Tư vấn phong thuỷ', value: 'fengshui' },
    { label: 'Khuyến mãi', value: 'promotion' },
    { label: 'Sự kiện', value: 'event' },
  ];

  tinymceConfig: RawEditorOptions = {
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

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    public router: Router,
    private message: NzMessageService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      post_type: ['news', [Validators.required]],
      active: ['1', [Validators.required]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.postId = Number(params['id']);
        if (this.postId) {
          this.loadPost(this.postId);
        }
      } else {
        this.postForm.get('image')?.setValidators([Validators.required]);
        this.postForm.get('image')?.updateValueAndValidity();
      }
    });
  }

  loadPost(id: number): void {
    this.loading = true;
    this.postService.getPostById(id).subscribe({
      next: (response) => {
        const post = response.data;
        console.log('Post data:', post);
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
          post_type: post.post_type,
          active: post.active
        });

        if (post.image) {
          const driveId = post.image.drive_id;
          if (driveId) {
            this.imageUrl = `https://lh3.googleusercontent.com/d/${driveId}`;
            this.postForm.patchValue({
              image: driveId
            });
          }
        }
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải thông tin bài viết');
        this.loading = false;
      }
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    this.postForm.patchValue({
      image: file
    });
    // Tạo URL preview cho file mới upload
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    return false;
  };

  submitForm(): void {
    if (this.postForm.valid) {
      this.loading = true;
      const formData = new FormData();
      const title = this.postForm.get('title')?.value;
      const content = this.postForm.get('content')?.value;
      const postType = this.postForm.get('post_type')?.value;
      const active = this.postForm.get('active')?.value;

      if (title && content && postType && active) {
        formData.append('title', title);
        formData.append('content', content);
        formData.append('post_type', postType);
        formData.append('active', active);

        if (this.fileList.length > 0) {
          formData.append('image', this.fileList[0] as any);
        } else if (this.isEdit && this.imageUrl) {
          const imageId = this.postForm.get('image')?.value;
          if (imageId) {
            formData.append('image_id', imageId);
          }
        }

        if (this.isEdit && this.postId) {
          formData.append('post_id', this.postId.toString());
          this.postService.updatePost(formData, this.postId).subscribe({
            next: (response) => {
              this.message.success('Cập nhật bài viết thành công');
              this.router.navigate(['/post']);
            },
            error: (error) => {
              this.message.error('Có lỗi xảy ra khi cập nhật bài viết: ' + (error.error?.message || 'Vui lòng thử lại'));
              this.loading = false;
            }
          });
        } else {
          this.postService.createPost(formData).subscribe({
            next: (response) => {
              this.message.success('Tạo bài viết thành công');
              this.router.navigate(['/post']);
            },
            error: (error) => {
              this.message.error('Có lỗi xảy ra khi tạo bài viết: ' + (error.error?.message || 'Vui lòng thử lại'));
              this.loading = false;
            }
          });
        }
      }
    } else {
      Object.values(this.postForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
