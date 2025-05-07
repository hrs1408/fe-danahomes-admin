import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TagService, TagRequest } from '../../../../core/services/tag.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tag-form',
  standalone: false,
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss'
})
export class TagFormComponent implements OnInit {
  tagForm!: FormGroup;
  isEdit = false;
  loading = false;
  tagId?: number;

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.tagForm = this.fb.group({
      name: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      color: ['#1890ff', [Validators.required]] // Màu mặc định là xanh da trời
    });
  }

  checkEditMode(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.tagId = +id;
      this.loadTagData();
    }
  }

  loadTagData(): void {
    if (!this.tagId) return;

    this.loading = true;
    this.tagService.getTagById(this.tagId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (!response.meta.error && response.data) {
            const tag = response.data;
            this.tagForm.patchValue({
              name: tag.name,
              slug: tag.slug,
              color: tag.color
            });
          } else {
            this.message.error('Không thể tải thông tin thẻ');
            this.router.navigate(['/tags']);
          }
        },
        error: (error) => {
          this.message.error('Có lỗi khi tải thông tin thẻ');
          console.error('Error:', error);
          this.router.navigate(['/tags']);
        }
      });
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      this.loading = true;
      const formData: TagRequest = this.tagForm.value;

      const request$ = this.isEdit && this.tagId
        ? this.tagService.updateTag(this.tagId, formData)
        : this.tagService.createTag(formData);

      request$.pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response) => {
            if (!response.meta.error) {
              this.message.success(
                this.isEdit ? 'Cập nhật thẻ thành công!' : 'Thêm thẻ thành công!'
              );
              this.router.navigate(['/tags']);
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
      Object.values(this.tagForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tags']);
  }
}
