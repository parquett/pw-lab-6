import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ThemeToggleComponent } from "./components/theme-toggle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieFormComponent, MovieListComponent, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Movie Collection Manager';
}
