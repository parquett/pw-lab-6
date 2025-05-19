import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const role = localStorage.getItem('user_role');
    if (role) {
      this.currentRoleSubject.next(role);
    }
  }

  getToken(role: string = 'VISITOR'): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.apiUrl}/auth/token`, { role });
  }

  setToken(token: string, role: string): void {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('user_role', role);
    this.currentRoleSubject.next(role);
  }

  getStoredToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  getCurrentRole(): Observable<string | null> {
    return this.currentRoleSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    this.currentRoleSubject.next(null);
  }

  hasPermission(action: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE'): boolean {
    const role = this.currentRoleSubject.value;
    switch (role) {
      case 'ADMIN':
        return true;
      case 'WRITER':
        return ['READ', 'WRITE', 'UPDATE'].includes(action);
      case 'VISITOR':
        return action === 'READ';
      default:
        return false;
    }
  }
}