import { Component, OnInit } from '@angular/core';
import { SendEmailService } from '../../services/send-email.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-modulo-visual',
  templateUrl: './modulo-visual.component.html',
  styleUrls: ['./modulo-visual.component.css']
})
export class ModuloVisualComponent {

  emails: any[] = [];

  //Para el buscador y el filtro
  filtro = { seleccionado: 'Ultimos agregados', buscar: '' };

  //Para el modal
  caso: string = '';
  descripcion: string = '';

  constructor(private email: SendEmailService, private alert: AlertsService) {
    //Obtiene todos los registros guardados en la base de datos
    this.email.getEmails().subscribe((emails: any[]) => {
      if(emails['status']) {
        this.emails = [];
        this.alert.mensajeError('No hay un token valido');
        return ;
      }
      this.emails = emails
    });
   }


  descargar(ubicacion: string[], nombre: string) {
    //Envia la ubicacion de los archivos a descargar y el nombre con que se descargará el archivo zip
    this.email.descargarZip(ubicacion, nombre);
  }

  //Verifica si se mostrará el número telefonico o el correo electronico
  contactoValue(value: string, email): string {
    if(email.telefono) return email.telefono;
    if(email.correo) return email.correo;
    return value
  }


  marcarLeido(id, leido) {
    this.emails.forEach(email => { if(email._id === id) email.leido = leido });
    this.email.marcarLeido(id, leido);
  }

}
