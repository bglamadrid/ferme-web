import { Component } from '@angular/core';

@Component({
  selector: 'app-centered-mat-spinner',
  template: `<div><mat-spinner></mat-spinner></div>`,
  styles: [
    `div {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      justify-items: center;
    }`
  ]
})
export class CenteredMatSpinnerComponent {

  constructor() { }

}
