import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { StarRatingComponent } from '../star-rating.component';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  private _movieService = inject(MovieService);
  private _destroyRef = inject(DestroyRef);

  protected movies: Movie[] = [];


  public ngOnInit(): void {
    this._movieService.getMovies().pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(movies => {
      this.movies = movies;
    });
  }

  protected deleteMovie(id: number | undefined): void {
    if (id !== undefined) {
      this._movieService.deleteMovie(id).subscribe({
        error: (error) => console.error('Error deleting movie:', error)
      });
    }
  }

  protected setAsWatched(id: number | undefined): void {
    if (id !== undefined) {
      this._movieService.updateMovieStatus(id, 'watched').subscribe({
        error: (error) => console.error('Error updating movie status:', error)
      });
    }
  }

  protected setMovieRating(id: number | undefined, value: number): void {
    if (id !== undefined) {
      this._movieService.updateMovieScore(id, value).subscribe({
        error: (error) => console.error('Error updating movie score:', error)
      });
    }
  }
} 