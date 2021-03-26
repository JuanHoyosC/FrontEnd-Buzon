import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router){}

  canActivate(): boolean {
    if(this.auth.estaAutenticado()) this.route.navigateByUrl('/modulo');
    return true;
  }
  
  
}
