import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UserService, User } from '../../../../core/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.users = response.data;
        },
        error: (error) => {
          this.message.error('Có lỗi xảy ra khi tải danh sách người dùng');
          console.error('Error:', error);
        }
      });
  }

  onAddUser(): void {
    this.router.navigate(['/users/create']);
  }

  onEditUser(userId: number): void {
    this.router.navigate(['/users/edit', userId]);
  }

  onDeleteUser(userId: number): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa người dùng này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(userId),
      nzCancelText: 'Hủy',
    });
  }

  deleteUser(userId: number): void {
    this.loading = true;
    this.userService.deleteUser(userId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (response.meta.error) {
            this.message.error(response.meta.message || 'Xóa thất bại!');
          } else {
            this.message.success('Xóa người dùng thành công!');
            this.loadUsers(); // Tải lại danh sách
          }
        },
        error: (error) => {
          this.message.error('Có lỗi xảy ra khi xóa người dùng');
          console.error('Error:', error);
        }
      });
  }
}
