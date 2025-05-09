import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ChangePasswordRequest, ChangeProfileRequest, UserProfileResponse } from '../types/account.type';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) { }

  getProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${this.apiUrl}/me`);
  }

  updateProfile(data: ChangeProfileRequest): Observable<UserProfileResponse> {
    return this.http.post<UserProfileResponse>(`${this.apiUrl}/change-profile`, data);
  }

  changePassword(data: ChangePasswordRequest): Observable<UserProfileResponse> {
    return this.http.post<UserProfileResponse>(`${this.apiUrl}/change-password`, data);
  }
}
