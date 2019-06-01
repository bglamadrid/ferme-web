import { Component, OnInit } from '@angular/core';
import { MatSidenavModule   } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private _abierto: boolean = true;
  public get Abierto() { return this._abierto; }

  constructor() { }

  ngOnInit() {
  }

}
