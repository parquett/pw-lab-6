import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="btn-group" role="group">
        <button class="btn btn-primary" (click)="login('ADMIN')">Login as Admin</button>
        <button class="btn btn-secondary" (click)="login('WRITER')">Login as Writer</button>
        <button class="btn btn-info" (click)="login('VISITOR')">Login as Visitor</button>
      </div>
    </div>
  `
})
export class LoginComponent {
  private _authService = inject(AuthService);

  login(role: string): void {
    this._authService.getToken(role).subscribe({
      next: (response) => {
        this._authService.setToken(response.token);
      },
      error: (error) => console.error('Login error:', error)
    });
  }
}