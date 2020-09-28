import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera.interfaces';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  movies: Movie[] = [];
  keyword: string = '';

  constructor(private activateRoute: ActivatedRoute,
              private peliService: PeliculasService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      // console.log(params.keyword);
      this.keyword = params.keyword;
      this.peliService.buscarPeliculas(params.keyword).subscribe(resp => {
        // console.log(resp);
        this.movies = resp;
      })
    });
  }

}
