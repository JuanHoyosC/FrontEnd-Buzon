import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent  {

  constructor(public auth: AuthService) { }

  estaAutenticado(): boolean {
    return this.auth.estaAutenticado();
  }


  logout() {
    this.auth.logout();
  }


}
