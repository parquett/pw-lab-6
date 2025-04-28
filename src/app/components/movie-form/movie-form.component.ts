import { Component, inject } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent {
  private _movieService = inject(MovieService);

  protected movieForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    coverUrl: new FormControl<string>('', [Validators.required]),
    watchUrl: new FormControl<string>('', [Validators.required]),
    status: new FormControl<string>('', [Validators.required]),
    score: new FormControl<number | null>(null)
  });

  protected addMovie(): void {
    if (this.movieForm.valid) {
      const newMovie: Movie = this.movieForm.value as Movie;
      this._movieService.addMovie(newMovie);
      this.movieForm.reset();
    }
  }

  protected setRating(value: number): void {
    this.movieForm.controls.score.setValue(value);
  }
} 