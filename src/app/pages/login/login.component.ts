import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { SendEmailService } from '../../services/send-email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private email: SendEmailService, private alert: AlertsService, private route: Router) { }


  login(form: NgForm) {
    if(!form.valid) return ;
    this.email.login(form.value).subscribe(res => {
      if(res['status']) { this.alert.mensajeError('Usuario o contraseña incorrecta'); return; }
      this.route.navigateByUrl('/modulo');
    })
  }  

}
