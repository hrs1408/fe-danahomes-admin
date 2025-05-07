import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiResponse } from './user.service';

export interface Tag {
  id: number;
  slug: string;
  name: string;
  color: string;
}

export interface TagRequest {
  slug: string;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = `${environment.apiUrl}tag`;

  constructor(private http: HttpClient) {}

  getTags(): Observable<ApiResponse<Tag[]>> {
    return this.http.get<ApiResponse<Tag[]>>(`${this.apiUrl}/get-all`);
  }

  getTagById(id: number): Observable<ApiResponse<Tag>> {
    return this.http.get<ApiResponse<Tag>>(`${this.apiUrl}/get-by-id/${id}`);
  }

  createTag(tag: TagRequest): Observable<ApiResponse<Tag>> {
    return this.http.post<ApiResponse<Tag>>(`${this.apiUrl}/create`, tag);
  }

  updateTag(id: number, tag: TagRequest): Observable<ApiResponse<Tag>> {
    return this.http.put<ApiResponse<Tag>>(`${this.apiUrl}/update/${id}`, tag);
  }

  deleteTag(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }
}
