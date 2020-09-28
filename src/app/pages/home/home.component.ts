import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  slideShowMovies: Movie[] = [];

  @HostListener('window: scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      // console.log('load movies');
      if (this.peliService.cargando) {return;}
      this.peliService.getCartelera().subscribe( movies => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliService: PeliculasService) {}

  ngOnInit() {
    this.peliService.getCartelera().subscribe(movies => {
      // console.log(resp);
      this.movies = movies;
      this.slideShowMovies = movies;
    });
  }

  ngOnDestroy(): void {
    this.peliService.resetPage();
  }
}
