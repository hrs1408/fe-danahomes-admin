import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-product',
  standalone: false,
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  isVisible = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi tải danh sách sản phẩm');
        this.loading = false;
      }
    });
  }

  createProduct(): void {
    this.router.navigate(['/products/create']);
  }

  editProduct(id: number): void {
    this.router.navigate([`/products/${id}/edit`]);
  }

  viewProduct(product: Product): void {
    this.selectedProduct = product;
    this.isVisible = true;
  }

  confirmDelete(id: number): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteProduct(id),
      nzCancelText: 'Hủy'
    });
  }

  deleteProduct(id: number): void {
    this.loading = true;
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.message.success('Xóa sản phẩm thành công');
        this.loadProducts();
      },
      error: (error) => {
        this.message.error('Có lỗi xảy ra khi xóa sản phẩm');
        this.loading = false;
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.selectedProduct = null;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
}
