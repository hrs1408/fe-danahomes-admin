import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService, CreateUserRequest, UpdateUserRequest, User } from '../../../../core/services/user.service';
import { finalize } from 'rxjs/operators';

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
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkEditMode();
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      user_role: ['user', [Validators.required]],
      user_information: this.fb.group({
        full_name: ['', [Validators.required]],
        phone_number: ['', [Validators.required]],
        address: [''],
        dob: [null]
      })
    });

    this.updatePasswordValidation();
  }

  updatePasswordValidation(): void {
    const passwordControl = this.userForm.get('password');
    if (passwordControl) {
      if (this.isEdit) {
        passwordControl.clearValidators();
      } else {
        passwordControl.setValidators([Validators.required, Validators.minLength(6)]);
      }
      passwordControl.updateValueAndValidity();
    }
  }

  checkEditMode(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.userId = +id;
      this.loadUserData();
    }
  }

  loadUserData(): void {
    if (!this.userId) return;

    this.loading = true;
    this.userService.getUserById(this.userId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          if (response.data) {
            const user = response.data;
            this.userForm.patchValue({
              email: user.email,
              user_role: user.user_role,
              user_information: {
                full_name: user.user_information.full_name,
                phone_number: user.user_information.phone_number,
                address: user.user_information.address,
                dob: user.user_information.dob ? new Date(user.user_information.dob) : null
              }
            });
          }
        },
        error: (error) => {
          this.message.error('Có lỗi khi tải thông tin người dùng');
          console.error('Error loading user:', error);
          this.router.navigate(['/users']);
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      const formData = this.userForm.value;

      if (this.isEdit && this.userId) {
        // Nếu password rỗng, loại bỏ khỏi request
        const updateData: UpdateUserRequest = {
          email: formData.email,
          user_role: formData.user_role,
          user_information: formData.user_information
        };

        // Chỉ thêm password vào request nếu người dùng nhập password mới
        if (formData.password) {
          updateData.password = formData.password;
        }

        this.userService.updateUser(this.userId, updateData)
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: (response) => {
              if (response.meta.error) {
                this.message.error(response.meta.message || 'Cập nhật thất bại!');
              } else {
                this.message.success('Cập nhật thông tin thành công!');
                this.router.navigate(['/users']);
              }
            },
            error: (error) => {
              this.message.error('Có lỗi xảy ra khi cập nhật người dùng!');
              console.error('Error:', error);
            }
          });
      } else {
        const createData: CreateUserRequest = formData;
        this.userService.createUser(createData)
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: (response) => {
              if (response.meta.error) {
                this.message.error(response.meta.message || 'Thêm mới thất bại!');
              } else {
                this.message.success('Thêm người dùng thành công!');
                this.router.navigate(['/users']);
              }
            },
            error: (error) => {
              this.message.error('Có lỗi xảy ra khi thêm người dùng!');
              console.error('Error:', error);
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
