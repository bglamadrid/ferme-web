import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { OrdenCompra } from 'src/modelo/OrdenCompra';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OrdenesCompraHttpService } from 'src/http-services/ordenes_compra.service';
import { OrdenesCompraListadoComponent } from './listado/listado.component';
import { OrdenCompraFormularioComponent, OrdenCompraFormularioDialogData } from './formulario/formulario.component';

@Component({
  selector: 'app-ordenes-compra',
  templateUrl: './ordenes_compra.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css',
    './ordenes_compra.component.css'
  ]
})
export class OrdenesCompraComponent implements OnInit {

  protected _ordenesCompra: OrdenCompra[];
  protected _ordenesCompraSource: Subject<OrdenCompra[]>;
  public ordenesCompra$: Observable<OrdenCompra[]>;

  protected _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  protected _busySource: Subject<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: OrdenesCompraListadoComponent;

  constructor(
    protected httpSvc: OrdenesCompraHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    this._ordenesCompra = [];
    this._ordenesCompraSource = new Subject<OrdenCompra[]>();
    this.ordenesCompra$ = this._ordenesCompraSource.asObservable();

    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();

    this._busySource = new Subject<boolean>();
    this.busy$ = this._busySource.asObservable();
  }

  ngOnInit() {
    this.cargarOrdenesCompra();
  }

  protected cargarOrdenesCompra(): Observable<OrdenCompra[]> {
    this._loadingSource.next(true);
    let ordenesCompra: Observable<OrdenCompra[]> = this.httpSvc.listarOrdenesCompra();
    ordenesCompra.subscribe((payload: OrdenCompra[]) => {
      this._ordenesCompra = payload;
      this._ordenesCompraSource.next(payload);
    }, err => {
      console.log(err);
      this._ordenesCompra = [];
      this._ordenesCompraSource.next([]);
    }, () => {
      this._loadingSource.next(false);
      this._busySource.next(false);
    });
    return from(ordenesCompra);
  }

  public onClickAgregar(): void {
    this._busySource.next(true);
    this.dialog.open(OrdenCompraFormularioComponent, {
      width: "40rem",
      height: "28rem"
    }).afterClosed().subscribe(
      (nuevo: OrdenCompra) => {
        if (nuevo) {
          this.cargarOrdenesCompra();
        }
      },
      err => { console.log(err); },
      () => { this._busySource.next(false); }
    );
  }

  public onClickEditar(vnt: OrdenCompra): void {
    this._busySource.next(true);
    const dialogData: OrdenCompraFormularioDialogData = {
      ordenCompra: vnt
    };

    this.dialog.open(OrdenCompraFormularioComponent, {
      width: "40rem",
      height: "28rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: OrdenCompra) => {
        if (editado) {
          this.cargarOrdenesCompra();
        }
      },
      err => { console.log(err); },
      () => { this._busySource.next(false); }
    );
  }

  public onClickBorrar(vnt: OrdenCompra) {
    this._busySource.next(true);
    this.httpSvc.borrarOrdenCompra(vnt.idOrdenCompra).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Orden de compra eliminada.");
          this.cargarOrdenesCompra();
        } else {
          this.snackBar.open("Hubo un problema al borrar la orden de compra.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.");
        console.log(err);
       },
       () => { this._busySource.next(false); }
    );
  }

}
