import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styles: [
  ]
})
export class FiltroComponent {

  @Input() filtro = null;

  constructor() { }

}
