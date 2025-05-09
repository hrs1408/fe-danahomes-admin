import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from '../../services/account.service';
import { UserProfile } from '../../types/account.type';

@Component({
  selector: 'app-profile-form',
  standalone: false,
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements OnInit {
  @Input() profile!: UserProfile;
  profileForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      full_name: [this.profile.user_information.full_name, [Validators.required]],
      phone_number: [this.profile.user_information.phone_number, [Validators.required]],
      address: [this.profile.user_information.address, [Validators.required]],
      dob: [this.profile.user_information.dob ? new Date(this.profile.user_information.dob) : null]
    });
  }

  submitForm(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      const formValue = this.profileForm.value;

      const data = {
        ...formValue,
        dob: formValue.dob ? new Date(formValue.dob).toISOString() : ''
      };

      this.accountService.updateProfile(data).subscribe({
        next: (response) => {
          this.message.success('Cập nhật thông tin thành công');
          this.loading = false;
        },
        error: (error) => {
          this.message.error('Có lỗi xảy ra khi cập nhật thông tin: ' + (error.error?.message || 'Vui lòng thử lại'));
          this.loading = false;
        }
      });
    } else {
      Object.values(this.profileForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
