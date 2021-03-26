import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(value: any[], opcion, index): any[] {
    //Verifica si se quiere buscar por index y retorna el correo
    if (index !== '') return value.filter(a => a.index === Number(index));

    //Verifica en que forma se quiere ordenar y retornar el elemento ordenado
    switch (opcion) {
      case 'Ultimos agregados':
        value.sort((a, b) => b['index'] - a['index'])
        break;
      case 'Primeros agregados':
        value.sort((a, b) => a['index'] - b['index'])
        break;
      case 'No leidos':
      value.sort((a,b) => a?.leido-b?.leido);
      break;
    }
    return value;
  }

}
