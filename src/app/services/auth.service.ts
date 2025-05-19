import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(role: string = 'VISITOR'): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/token`, { role });
  }

  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getStoredToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}