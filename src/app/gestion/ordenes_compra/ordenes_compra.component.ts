import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { OrdenCompra } from 'src/models/OrdenCompra';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OrdenesCompraHttpService } from 'src/http-services/ordenes_compra.service';
import { OrdenesCompraListadoComponent } from './listado/listado.component';
import { OrdenCompraFormularioComponent, OrdenCompraFormularioDialogData } from './formulario/formulario.component';

@Component({
  selector: 'app-ordenes-compra',
  templateUrl: './ordenes_compra.component.html',
  styleUrls: [
    '../gestion-pages.css',
    './ordenes_compra.component.css'
  ]
})
export class OrdenesCompraComponent implements OnInit {

  public ordenesCompra$: Observable<OrdenCompra[]>;
  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: OrdenesCompraListadoComponent;

  constructor(
    private httpSvc: OrdenesCompraHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.loading$ = of(true);
    this.busy$ = of(true);
  }

  ngOnInit() {
    this.cargarOrdenesCompra();
  }

  private cargarOrdenesCompra(): Observable<OrdenCompra[]> {
    this.loading$ = of(true);
    let ordenesCompra: Observable<OrdenCompra[]> = this.httpSvc.listarOrdenesCompra();
    ordenesCompra.subscribe((payload: OrdenCompra[]) => {
      this.ordenesCompra$ = of(payload);
    }, err => {
      console.log(err);
      this.ordenesCompra$ = of([]);
    }, () => {
      this.loading$ = of(false);
      this.busy$ = of(false);
    });
    return from(ordenesCompra);
  }

  public onClickAgregarOrdenCompra(): void {
    this.busy$ = of(true);
    this.dialog.open(OrdenCompraFormularioComponent, {
      width: "40rem",
      height: "37rem"
    }).afterClosed().subscribe(
      (nuevo: OrdenCompra) => {
        if (nuevo) {
          this.cargarOrdenesCompra();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickEditarOrdenCompra(vnt: OrdenCompra): void {
    this.busy$ = of(true);
    const dialogData: OrdenCompraFormularioDialogData = {
      ordenCompra: vnt
    };

    this.dialog.open(OrdenCompraFormularioComponent, {
      width: "40rem",
      height: "37rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: OrdenCompra) => {
        if (editado) {
          this.cargarOrdenesCompra();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickBorrarOrdenCompra(vnt: OrdenCompra) {
    this.busy$ = of(true);
    this.httpSvc.borrarOrdenCompra(vnt.idOrdenCompra).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Orden de compra eliminada.");
        } else {
          this.snackBar.open("Hubo un problema al borrar la orden de compra.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.");
        console.log(err);
       },
       () => { this.busy$ = of(false); }
    );
  }

}
