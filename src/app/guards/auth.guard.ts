import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router) {}

  canActivate(): boolean {
    if(!this.auth.estaAutenticado()) this.route.navigateByUrl('/home');
    return true;
  }
  
}
