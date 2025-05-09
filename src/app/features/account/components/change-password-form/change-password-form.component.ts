import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-change-password-form',
  standalone: false,
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss'
})
export class ChangePasswordFormComponent {
  passwordForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private message: NzMessageService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validators: this.confirmPasswordValidator
    });
  }

  private confirmPasswordValidator(group: FormGroup): { [key: string]: any } | null {
    const newPassword = group.get('new_password');
    const confirmPassword = group.get('confirm_password');

    if (!newPassword || !confirmPassword) return null;

    return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  submitForm(): void {
    if (this.passwordForm.valid) {
      this.loading = true;
      const { old_password, new_password } = this.passwordForm.value;

      this.accountService.changePassword({ old_password, new_password }).subscribe({
        next: (response) => {
          this.message.success('Đổi mật khẩu thành công');
          this.passwordForm.reset();
          this.loading = false;
        },
        error: (error) => {
          this.message.error('Có lỗi xảy ra khi đổi mật khẩu: ' + (error.error?.message || 'Vui lòng thử lại'));
          this.loading = false;
        }
      });
    } else {
      Object.values(this.passwordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
