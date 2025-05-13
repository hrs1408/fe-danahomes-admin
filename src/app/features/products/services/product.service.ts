import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import {
  ProductResponse,
  ProductListResponse,
  ProductRequest,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}product`;
  private apiMediaUrl = `${environment.apiUrl}media`;
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(`${this.apiUrl}/get-all`);
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/get-by-id/${id}`);
  }

  createProduct(data: FormData | ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.apiUrl}/create`, data);
  }

  updateProduct(
    id: number,
    data: FormData | ProductRequest
  ): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/update/${id}`, data);
  }

  deleteProduct(id: number): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(`${this.apiUrl}/delete/${id}`);
  }

  uploadImage(
    file: File,
    fileType: 'cover' | 'product',
    productDetailId: number
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.apiMediaUrl}/upload?type=${fileType}&parent_id=${productDetailId}`;
    return this.http.post(url, formData);
  }

  deleteImage(imageId: number, driveId: string): Observable<any> {
    return this.http.delete(`${this.apiMediaUrl}/delete?id=${imageId}&drive_id=${driveId}`);
  }

  getProductByProject(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(`${this.apiUrl}/product-by-project`);
  }

  getProduct(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${environment.apiUrl}products/${id}`);
  }
}
