import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-listado-acciones',
  templateUrl: './listado-acciones.component.html',
  styleUrls: ['./listado-acciones.component.css']
})
export class ListadoAccionesComponent {

  @Output() public agregar: EventEmitter<void>;

  constructor() { 
    this.agregar = new EventEmitter();
  }

  public onClickAgregar(): void {
    this.agregar.emit();
  }

}
