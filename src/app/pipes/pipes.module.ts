import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPathPipe } from './poster-path.pipe';



@NgModule({
  declarations: [PosterPathPipe],
  exports: [
    PosterPathPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
