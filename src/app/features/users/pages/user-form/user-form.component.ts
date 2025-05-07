import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService, CreateUserRequest } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEdit = false;
  loading = false;
  userId?: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      user_role: ['user', [Validators.required]],
      user_information: this.fb.group({
        full_name: ['', [Validators.required]],
        phone_number: ['', [Validators.required]],
        address: [''],
        dob: [null]
      })
    });

    if (this.isEdit) {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  checkEditMode(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.userId = +id;
      // TODO: Load user data for editing
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      const userData: CreateUserRequest = this.userForm.value;

      if (this.isEdit) {
        // TODO: Update user
        console.log('Update user:', userData);
      } else {
        this.userService.createUser(userData).subscribe({
          next: (response) => {
            this.message.success('Thêm người dùng thành công!');
            this.router.navigate(['/users']);
          },
          error: (error) => {
            this.message.error('Có lỗi xảy ra khi thêm người dùng!');
            console.error('Error:', error);
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
