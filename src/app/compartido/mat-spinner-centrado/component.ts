import { Component } from '@angular/core';

@Component({
  selector: 'mat-spinner-centrado',
  template: `<div><mat-spinner></mat-spinner></div>`,
  styles: [
    `div {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      justify-items: center;
      overflow: hidden;
    }`
  ]
})
export class MatProgressSpinnerCentradoComponent {

  constructor() { }

}
