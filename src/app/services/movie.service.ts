import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/movies`;
  private moviesSubject = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient) {
    this.loadMovies();
  }

  private loadMovies(): void {
    this.http.get<Movie[]>(this.apiUrl)
      .subscribe(movies => this.moviesSubject.next(movies));
  }

  public getMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie).pipe(
      tap(() => this.loadMovies())
    );
  }

  public deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadMovies())
    );
  }

  public updateMovieStatus(id: number, status: string): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, { status }).pipe(
      tap(() => this.loadMovies())
    );
  }

  public updateMovieScore(id: number, score: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, { score }).pipe(
      tap(() => this.loadMovies())
    );
  }
} 