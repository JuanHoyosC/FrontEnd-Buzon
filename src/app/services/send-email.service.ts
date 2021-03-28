import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { saveAs } from 'file-saver';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  loading: boolean = false;

  constructor(private http: HttpClient, private auth: AuthService) { }

  //Envia los archivos a la base de datos
  sendFiles(data) {
    return this.http.post('http://localhost:4000', data);
  }

  //Obtiene los correos enviados y sus archivos
  getEmails() {
    return this.http.get('http://localhost:4000/emails', {headers: {'access-token': this.auth.userToken}});
  }

  descargarZip(ubicacion: string[], nombre: string) {
      this.loading = true;
      this.http.post<Blob>(`http://localhost:4000/descargaZip`, {ubicacion: ubicacion},  {headers: {'access-token': this.auth.userToken}, observe: 'response', responseType: 'blob' as 'json'})
              .subscribe((data) => {
              
        //Libreria que ayuda en las descargas de archivos        
        saveAs(data.body, `${ nombre }.zip`)
        setTimeout(()=> this.loading = false , 250);
      }, (error) => console.log(error))

  }


  //Se encarga de marcar el leido y mandar el actualziado al backend
  marcarLeido(id, leido) {
    this.http.post('http://localhost:4000/marcarLeido', {id, leido: leido}, {headers: {'access-token': this.auth.userToken}}).subscribe(res => console.log(res))
  }


  //Se encarga de enviar el correo al backend
  sendEmail(data) {
    return this.http.post('http://localhost:4000/email', data);
  }


  login(usuario) {
    return this.http.post('http://localhost:4000/login', usuario)
                .pipe(map(res => {
                  if(res['token']) this.auth.guardarToken(res['token']);
                  return res;
                }))
  }


}
