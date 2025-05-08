import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostResponse, PostListResponse } from '../models/post.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}post`;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<PostListResponse> {
    return this.http.get<PostListResponse>(`${this.apiUrl}/get-all`);
  }

  getPostById(id: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.apiUrl}/get-by-id/${id}`);
  }

  createPost(formData: FormData): Observable<PostResponse> {
    return this.http.post<PostResponse>(`${this.apiUrl}/create`, formData);
  }

  updatePost(formData: FormData, id: number): Observable<PostResponse> {
    return this.http.put<PostResponse>(`${this.apiUrl}/update/${id}`, formData);
  }

  deletePost(id: number): Observable<PostResponse> {
    return this.http.delete<PostResponse>(`${this.apiUrl}/delete/${id}`);
  }
}
