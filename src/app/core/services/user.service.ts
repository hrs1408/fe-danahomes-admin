import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export interface UserInformation {
  full_name: string;
  phone_number: string;
  address: string;
  dob: string;
  id?: number;
  user_id?: number;
}

export interface User {
  id: number;
  email: string;
  user_role: string;
  is_active: boolean;
  user_information: UserInformation;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  user_role: string;
  user_information: UserInformation;
}

export interface UpdateUserRequest {
  email: string;
  password?: string;
  user_role: string;
  user_information: UserInformation;
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    error: boolean;
    message: string;
  };
  status_code: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/list`);
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/by-id/${id}`);
  }

  createUser(user: CreateUserRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/create`, user);
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/edit/${id}`, user);
  }

  deleteUser(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete/${id}`);
  }
}
