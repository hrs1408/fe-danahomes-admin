import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CategoryService, Category } from '../../../../core/services/category.service';
import { IconService } from '../../../../core/services/icon.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-category',
  standalone: false,
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent implements OnInit {
  categories: Category[] = [];
  loading = false;

  constructor(
    private categoryService: CategoryService,
    private iconService: IconService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Kiểm tra loại icon và trả về cấu trúc phù hợp
  getIconType(icon: string): { type: string, isMaterial: boolean } {
    return this.iconService.getIconType(icon);
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (!response.meta.error) {
            this.categories = response.data;
          } else {
            this.message.error('Không thể tải danh sách danh mục');
          }
        },
        error: (error) => {
          this.message.error('Có lỗi khi tải danh sách danh mục');
          console.error('Error:', error);
        }
      });
  }

  onDeleteCategory(id: number): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa danh mục này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteCategory(id),
      nzCancelText: 'Hủy',
    });
  }

  deleteCategory(id: number): void {
    this.loading = true;
    this.categoryService.deleteCategory(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (!response.meta.error) {
            this.message.success('Xóa danh mục thành công!');
            this.loadCategories();
          } else {
            this.message.error(response.meta.message || 'Xóa danh mục thất bại!');
          }
        },
        error: (error) => {
          this.message.error('Có lỗi xảy ra khi xóa danh mục!');
          console.error('Error:', error);
        }
      });
  }
}
