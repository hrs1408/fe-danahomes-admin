import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { TagResponse, TagListResponse, TagRequest } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = `${environment.apiUrl}tag`;

  constructor(private http: HttpClient) { }

  getAllTags(): Observable<TagListResponse> {
    return this.http.get<TagListResponse>(`${this.apiUrl}/get-all`);
  }

  getTagById(id: number): Observable<TagResponse> {
    return this.http.get<TagResponse>(`${this.apiUrl}/get-by-id/${id}`);
  }

  createTag(tag: TagRequest): Observable<TagResponse> {
    return this.http.post<TagResponse>(`${this.apiUrl}/create`, tag);
  }

  updateTag(id: number, tag: TagRequest): Observable<TagResponse> {
    return this.http.put<TagResponse>(`${this.apiUrl}/update/${id}`, tag);
  }

  deleteTag(id: number): Observable<TagResponse> {
    return this.http.delete<TagResponse>(`${this.apiUrl}/delete/${id}`);
  }
}
