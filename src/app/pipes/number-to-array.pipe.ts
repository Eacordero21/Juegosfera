import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  transform(value: number): any {
    const fullStars = Math.floor(value); // Estrellas completas
    const halfStar = value % 1 >= 0.5 ? 1 : 0; // Si hay una media estrella
    const emptyStars = 5 - fullStars - halfStar; // Estrellas vacías

    // Crear un array que combina las estrellas completas, media estrella y vacías
    return [
      ...Array(fullStars).fill(1), // Lleno
      ...Array(halfStar).fill(0.5), // Media estrella
      ...Array(emptyStars).fill(0) // Vacías
    ];
  }

}
