import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (!response.meta.error) {
            this.authService.getMe().subscribe({
              next: (userResponse) => {
                console.log('User info:', userResponse);
              },
              error: (error) => {
                console.error('Error fetching user info:', error);
                this.message.error(error.error.data ?? 'Lỗi khi tải thông tin người dùng');
              }
            });
            this.message.success('Đăng nhập thành công');
            this.router.navigate(['/dashboard']);
          } else {
            this.message.error(response.meta.message || 'Đăng nhập thất bại');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.message.error(error.error.data ?? 'Đăng nhập thất bại. Vui lòng thử lại sau.');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
