import { Component, OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';

@Component({
  selector: 'app-cabecera-gestion',
  templateUrl: './cabecera-gestion.component.html',
  styleUrls: ['./cabecera-gestion.component.css']
})
export class CabeceraGestionComponent {

  public appName = 'FERME';
  public moduleName = 'Inicio';
  public userName = 'guest';

  constructor(
    protected service: GestionService
  ) { }

  public switchSidenavOpenState(): void {
    this.service.switchSidenav();
  }

  public onClickEditarUsuario(): void {

  }

  public onClickCerrarSesion(): void {

  }

}
