import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from '../../services/account.service';
import { UserProfile } from '../../types/account.type';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = false;

  constructor(
    private accountService: AccountService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.accountService.getProfile().subscribe({
      next: (response) => {
        this.profile = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải thông tin tài khoản');
        this.loading = false;
      }
    });
  }
}
