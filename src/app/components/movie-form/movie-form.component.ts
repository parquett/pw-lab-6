import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating.component';
import { AuthService } from '../../services/auth.service';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StarRatingComponent],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  private _movieService = inject(MovieService);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);

  protected canWrite = false;

  protected movieForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    coverUrl: new FormControl<string>('', [Validators.required]),
    watchUrl: new FormControl<string>('', [Validators.required]),
    status: new FormControl<string>('', [Validators.required]),
    score: new FormControl<number | null>(null)
  });

  ngOnInit() {
    this._authService.getCurrentRole().pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(() => {
      this.canWrite = this._authService.hasPermission('WRITE');
    });
  }

  protected addMovie(): void {
    if (this.movieForm.valid) {
      const newMovie: Movie = this.movieForm.value as Movie;
      this._movieService.addMovie(newMovie).subscribe({
        next: () => this.movieForm.reset(),
        error: (error) => console.error('Error adding movie:', error)
      });
    }
  }

  protected setRating(value: number): void {
    this.movieForm.controls.score.setValue(value);
  }
} 