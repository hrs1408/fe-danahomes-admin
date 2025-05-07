import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { Route } from '@angular/router';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token_type: string;
    access_token: string;
    access_token_expires: string;
    refresh_token: string;
    refresh_token_expires: string;
  };
  meta: {
    error: boolean;
    message: string | null;
  };
  status_code: number;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  // thêm các trường khác nếu cần
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((response) => {
          // Lưu token vào localStorage
          if (response.data?.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
          }
          return response;
        })
      );
  }

  getMe(): Observable<User> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(
      map((response: any) => {
        if (response.status_code === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          return response.data;
        } else {
          throw new Error(response.message);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user data:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserLoggedIn(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
