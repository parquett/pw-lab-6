import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="btn theme-toggle-btn"
      [class.btn-light]="isDarkThemeSig()" 
      [class.btn-dark]="!(isDarkThemeSig())"
      (click)="toggleTheme()">
      {{ (isDarkThemeSig()) ? '☀️' : '🌙' }}
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      align-items: center;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 0;
    }
  `]
})
export class ThemeToggleComponent {
  private _themeService = inject(ThemeService);
  protected isDarkThemeSig = this._themeService.isDarkThemeSig;

  protected toggleTheme(): void {
    this._themeService.toggleTheme();
  }
} 