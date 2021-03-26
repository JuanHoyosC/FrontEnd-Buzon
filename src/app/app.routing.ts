import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { ModuloVisualComponent } from './pages/modulo-visual/modulo-visual.component';
import { LoginComponent } from './pages/login/login.component';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { AuthLoginGuard } from './guards/auth-login.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'modulo', component: ModuloVisualComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent, canActivate: [ AuthLoginGuard ] },
    { path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
