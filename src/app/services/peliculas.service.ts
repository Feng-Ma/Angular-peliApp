import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cartelera, Movie } from '../interfaces/cartelera.interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { MovieDetails } from '../interfaces/movieDetails.interfaces';
import { Cast, Credits } from '../interfaces/credits.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  url: string = 'https://api.themoviedb.org/3';
  apikey: string = '6c1e6e76cf35fda1c87ef8945726f2ed';
  carteleraPage: number = 1;
  cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '6c1e6e76cf35fda1c87ef8945726f2ed',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetPage() {
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]>{
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    // return this.http.get<Cartelera>(`${this.url}/now_playing?api_key=${this.apikey}&language=es-ES&page=1`);
    return this.http.get<Cartelera>(`${this.url}/movie/now_playing`, {params: this.params})
          .pipe(
            map(resp => resp.results),
            tap(() => {
              this.carteleraPage += 1;
              this.cargando = false;
            })
          );
  }

  buscarPeliculas(keyword: string):Observable<Movie[]> {
    const params = {...this.params, page: '1', query: keyword};
    return this.http.get<Cartelera>(`${this.url}/search/movie`, {params: params})
        .pipe(
          catchError(err => of(null)),
          map(resp => resp.results)
        )
  }

  getPeliDetalles(id: string){
    const params = {...this.params, page: '1'};
    return this.http.get<MovieDetails>(`${this.url}/movie/${id}`, {params: params})
        .pipe(
          catchError(err => of(null))
        );
  }

  getCredits(id: string): Observable<Cast[]>{
    const params = {...this.params, page: '1'};
    return this.http.get<Credits>(`${this.url}/movie/${id}/credits`, {params: params})
    .pipe(
      catchError(err => of([])),
      map((resp: Credits) => resp.cast)
    );
  }
}
