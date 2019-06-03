import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-centered-mat-spinner',
  template: `<div><mat-spinner></mat-spinner></div>`,
  styleUrls: ['./centered.css']
})
export class CenteredMatSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
