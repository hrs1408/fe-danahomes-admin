import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UserService, User } from '../../../../core/services/user.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải danh sách người dùng');
        this.loading = false;
      }
    });
  }

  onAddUser(): void {
    this.router.navigate(['/users/create']);
  }
}
