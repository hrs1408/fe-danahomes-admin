import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Information } from '../../models/information.model';
import { InformationService } from '../../services/information.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-information-manager',
  standalone: false,
  templateUrl: './information-manager.component.html',
  styleUrl: './information-manager.component.scss'
})
export class InformationManagerComponent implements OnInit {
  informationForm: FormGroup;
  loading = false;
  isEditMode = false;
  information: Information | null = null;

  constructor(
    private fb: FormBuilder,
    private informationService: InformationService,
    private message: NzMessageService
  ) {
    this.informationForm = this.fb.group({
      address: ['', [Validators.required]],
      hotline: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      facebook: ['', [Validators.required]],
      twitter: ['', [Validators.required]],
      google: ['', [Validators.required]],
      zalo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadInformation();
  }

  loadInformation(): void {
    this.loading = true;
    this.informationService.getInformation().subscribe({
      next: (response) => {
        this.information = response.data;
        this.informationForm.patchValue(response.data);
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải thông tin');
        this.loading = false;
      }
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && this.information) {
      this.informationForm.patchValue(this.information);
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    if (this.information) {
      this.informationForm.patchValue(this.information);
    }
  }

  submitForm(): void {
    if (this.informationForm.valid) {
      this.loading = true;
      const formData: Information = this.informationForm.value;

      this.informationService.updateInformation(formData).subscribe({
        next: (response) => {
          this.message.success('Cập nhật thông tin thành công');
          this.information = response.data;
          this.isEditMode = false;
          this.loading = false;
        },
        error: (error) => {
          this.message.error('Có lỗi xảy ra khi cập nhật thông tin');
          this.loading = false;
        }
      });
    } else {
      Object.values(this.informationForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
