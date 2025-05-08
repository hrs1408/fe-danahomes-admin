import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Information, InformationResponse } from '../models/information.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private apiUrl = `${environment.apiUrl}information`;

  constructor(private http: HttpClient) { }

  getInformation(): Observable<InformationResponse> {
    return this.http.get<InformationResponse>(`${this.apiUrl}/get`);
  }

  updateInformation(data: Information): Observable<InformationResponse> {
    return this.http.post<InformationResponse>(`${this.apiUrl}/update`, data);
  }
}
