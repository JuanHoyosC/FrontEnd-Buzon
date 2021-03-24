import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SendEmailService } from '../../services/send-email.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //Lista de temas y tema inicial
  temas: string[] = ['Interno de la unidad', 'Interno al CJF', 'Externo al CJF'];
  temaSeleccionado: string = 'Interno de la unidad';

  //Lista de asuntos y asunto inicial
  asuntos: string[] = ['Denuncia', 'Queja', 'Sugerencia', 'Inconformidad'];
  asuntoSeleccionado: string = 'Denuncia';

  //Validar anonimato
  abrir: boolean = false;

  //Contacto
  contactos: string[] = ['Vía telefonica', 'Vía correo', 'De forma presencial'];
  contactoSeleccionado = 'Vía telefonica';

  //Archivo subido
  file: Array<File> = null;

  constructor(private _send: SendEmailService) { }

  submit(form: NgForm): void {

    //Si el formulario es invalido no se envia
    if (form.invalid) return;
    //Si no hay archivos se limpia los archivos seleccionados anteriormente
    if (form.value.file === '') this.file = null;

    //Se crea la data para enviar al backend
    let formData = new FormData();

    //Solo entra si hay archivos
    if (form.value.file !== '' && this.file !== null) {
      //Agrega los archivos a una lista de formData
      for (let i = 0; i < this.file.length; i++) {
        formData.append('', this.file[i]);
      }
    }


    //Primero se suben los archivos al servidor
    this._send.sendFiles(formData).subscribe(res => {
      //Se obtienen la ubicacion de los archivos que se subieron 
      const data = { ubicacion: res, ...form.value };
      //Se envia el correo con la información del formulario más los archivos que se adjuntaran (si los hay)
      this._send.sendEmail(data).subscribe(res => {
        //Muestra una ventana de que todo salio bien
        this.mensajeSucces(res['status'])

        //Limpia el formulario
        form.resetForm({ tipoAsunto: this.asuntoSeleccionado, tipoTema: this.temaSeleccionado, contacto: this.contactoSeleccionado });
        this.abrir = false;
      }, (res) => this.mensajeError(res.status))
    });
  }

  leerArchivo(e): void {
    //Lee los archivos que el usuario agrega y los guarda en file
    this.file = e.target.files;
  }

  mostrar(mostrar: string): void {
    //Verifica si será anonimo o no, dependiendo de la respuesta se mostrará los campos de contacto
    this.abrir = mostrar === 'si' ? false : true;
  }

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
