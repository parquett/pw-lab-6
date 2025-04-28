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
      [class.btn-light]="isDarkTheme$()" 
      [class.btn-dark]="!(isDarkTheme$())"
      (click)="toggleTheme()">
      {{ (isDarkTheme$()) ? '☀️' : '🌙' }}
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }
  `]
})
export class ThemeToggleComponent {
  private _themeService = inject(ThemeService);
  protected isDarkTheme$ = this._themeService.isDarkThemeSig;

  protected toggleTheme(): void {
    this._themeService.toggleTheme();
  }
} 