import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModuloVisualComponent } from './pages/modulo-visual/modulo-visual.component';
import { HeadTableComponent } from './components/head-table/head-table.component';

//routing

import { FeatureRoutingModule } from './app.routing';
import { OrdenarPipe } from './pipes/ordenar.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ModuloVisualComponent,
    OrdenarPipe,
    ModalComponent,
    HeadTableComponent,
    FiltroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FeatureRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
