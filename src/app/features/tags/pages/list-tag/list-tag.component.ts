import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TagService, Tag } from '../../../../core/services/tag.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-tag',
  standalone: false,
  templateUrl: './list-tag.component.html',
  styleUrl: './list-tag.component.scss'
})
export class ListTagComponent implements OnInit {
  tags: Tag[] = [];
  loading = false;

  constructor(
    private tagService: TagService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.loading = true;
    this.tagService.getTags()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (!response.meta.error) {
            this.tags = response.data;
          } else {
            this.message.error('Không thể tải danh sách thẻ');
          }
        },
        error: (error) => {
          this.message.error('Có lỗi khi tải danh sách thẻ');
          console.error('Error:', error);
        }
      });
  }

  onDeleteTag(id: number): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa thẻ này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTag(id),
      nzCancelText: 'Hủy',
    });
  }

  deleteTag(id: number): void {
    this.loading = true;
    this.tagService.deleteTag(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (!response.meta.error) {
            this.message.success('Xóa thẻ thành công!');
            this.loadTags();
          } else {
            this.message.error(response.meta.message || 'Xóa thẻ thất bại!');
          }
        },
        error: (error) => {
          this.message.error('Có lỗi xảy ra khi xóa thẻ!');
          console.error('Error:', error);
        }
      });
  }
}
