import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
          @if (currentRole$ | async; as role) {
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="badge bg-primary me-2">Logged in as: {{ role }}</span>
                <span class="badge" [ngClass]="getRoleBadgeClass(role)">
                  {{ getRolePermissions(role) }}
                </span>
              </div>
              <button class="btn btn-outline-danger" (click)="logout()">
                Logout
              </button>
            </div>
          } @else {
            <div class="btn-group" role="group">
              <button class="btn btn-primary" (click)="login('ADMIN')">Login as Admin</button>
              <button class="btn btn-secondary" (click)="login('WRITER')">Login as Writer</button>
              <button class="btn btn-info" (click)="login('VISITOR')">Login as Visitor</button>
            </div>
          }
    </div>
  `
})
export class LoginComponent {
  private _authService = inject(AuthService);
  protected currentRole$ = this._authService.getCurrentRole();

  login(role: string): void {
    this._authService.getToken(role).subscribe({
      next: (response) => {
        this._authService.setToken(response.token, role);
      },
      error: (error) => console.error('Login error:', error)
    });
  }

  logout(): void {
    this._authService.logout();
  }

  protected getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'ADMIN': return 'bg-danger';
      case 'WRITER': return 'bg-warning';
      case 'VISITOR': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  protected getRolePermissions(role: string): string {
    switch (role) {
      case 'ADMIN': return 'Full Access';
      case 'WRITER': return 'Read/Write/Update';
      case 'VISITOR': return 'Read Only';
      default: return 'No Access';
    }
  }
}
