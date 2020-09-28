import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movieDetails.interfaces';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits.interfaces';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: MovieDetails = null;
  cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private peliService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    this.peliService.getPeliDetalles(id).subscribe( resp => {
        // console.log(resp);
        if (!resp) {
          this.router.navigateByUrl('/home');
        }
        this.pelicula = resp;
    });
    // console.log(id);
    this.peliService.getCredits(id).subscribe( resp => {
      this.cast = resp.filter( cast => cast.profile_path!= null);
      // console.log(this.cast);
    });
  }

  regresar(){
    this.location.back();
  }

}
