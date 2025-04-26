import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  protected movies: Movie[] = [];
  protected moviesSubject = new BehaviorSubject<Movie[]>([]);

  constructor() {
    const savedMovies = localStorage.getItem('movies');
    if (savedMovies) {
      this.movies = JSON.parse(savedMovies);
      this.moviesSubject.next([...this.movies]);
    }
  }

  getMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  addMovie(movie: Movie): void {
    const newMovie = {
      ...movie,
      id: Date.now()
    };
    
    this.movies.push(newMovie);
    this.moviesSubject.next([...this.movies]);
    this.saveToLocalStorage();
  }

  deleteMovie(id: number): void {
    this.movies = this.movies.filter(movie => movie.id !== id);
    this.moviesSubject.next([...this.movies]);
    this.saveToLocalStorage();
  }

  protected saveToLocalStorage(): void {
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }
} 