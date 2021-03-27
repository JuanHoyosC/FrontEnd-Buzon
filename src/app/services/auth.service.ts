import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private route: Router){}
    userToken;

    logout() {
        localStorage.removeItem('token-buzon');
        localStorage.removeItem('expira-buzon');
        this.userToken = '';   
        this.route.navigateByUrl('/home');
    }

    guardarToken(idToken: string) {
        this.userToken = idToken;
        localStorage.setItem('token-buzon', idToken);
        let hoy = new Date();
        hoy.setSeconds(3600);
        localStorage.setItem('expira-buzon', hoy.getTime().toString());
    }

    leerToken() {
        if (localStorage.getItem('token-buzon')) {
            this.userToken = localStorage.getItem('token-buzon');
        } else {
            this.userToken = '';
        }
    }

    estaAutenticado(): boolean {

        this.leerToken();
        if (this.userToken.length < 2) {
            return false
        }

        const expira = Number(localStorage.getItem('expira-buzon'));
        const expireDate = new Date();
        expireDate.setTime(expira);
        if (expireDate > new Date()) {
            return true;
        } else {
            return false;
        }

    }

}