import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posterPath'
})
export class PosterPathPipe implements PipeTransform {

  transform(value: string): string {
    if (value!= null) {
      // return 'https://image.tmdb.org/t/p/w500' + value
      return `https://image.tmdb.org/t/p/w500${value}`
    } else {
      return './assets/no-image.jpg'
    }
  }

}
