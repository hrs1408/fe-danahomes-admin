import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IntroductionResponse, UpdateIntroductionDto } from '../models/introduction.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class IntroductionService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getIntroduction(): Observable<IntroductionResponse> {
    return this.http.get<IntroductionResponse>(`${this.baseUrl}introduction/get`);
  }

  updateIntroduction(data: UpdateIntroductionDto): Observable<IntroductionResponse> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('active', data.active.toString());
    if (data.image) {
      formData.append('image', data.image);
    }

    return this.http.post<IntroductionResponse>(`${this.baseUrl}introduction/update`, formData);
  }
}
