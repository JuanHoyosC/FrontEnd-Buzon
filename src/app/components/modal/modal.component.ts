import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  @Input() caso: string;
  @Input() descripcion: string;
  constructor() { }

  ngOnInit(): void {
  }

}
