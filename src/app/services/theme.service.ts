import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkThemeSig = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkThemeSig.set(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkThemeSig.set(prefersDark);
    }
    
    this.applyTheme();
  }

  public toggleTheme(): void {
    this.isDarkThemeSig.update(value => !value);
    this.saveThemePreference(this.isDarkThemeSig());
    this.applyTheme();
  }

  protected saveThemePreference(isDark: boolean): void {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  protected applyTheme(): void {
    if (this.isDarkThemeSig()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
