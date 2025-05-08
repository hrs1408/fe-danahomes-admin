import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

export interface CategoryResponse {
  data: Category[];
  message: string;
  status: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  active: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}category`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/get-all`);
  }
}
