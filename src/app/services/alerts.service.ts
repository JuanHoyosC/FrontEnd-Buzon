import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  mensajeError(error: string = 'Hubo un error, intentelo de nuevo') {
    Swal.fire({
      icon: 'error',
      title: 'Hubo un error',
      text: error
    })
  }

  mensajeSucces(mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: mensaje
    })
  }
}
