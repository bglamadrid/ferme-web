import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Venta } from 'src/modelo/Venta';
import { VentasListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { VentaFormularioComponent, VentaFormularioDialogData } from './formulario/formulario.component';
import { VentasHttpService } from 'src/http-services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class VentasComponent implements OnInit {

  public _ventas: Venta[];
  protected _ventasSource: Subject<Venta[]>;
  public ventas$: Observable<Venta[]>;

  protected _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  protected _busySource: Subject<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: VentasListadoComponent;

  constructor(
    protected httpSvc: VentasHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    this._ventas = [];
    this._ventasSource = new Subject<Venta[]>();
    this.ventas$ = this._ventasSource.asObservable();

    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();

    this._busySource = new Subject<boolean>();
    this.busy$ = this._busySource.asObservable();
  }

  ngOnInit() {
    this.cargarVentas();
  }

  protected cargarVentas(): Observable<Venta[]> {
    this.loading$ = of(true);
    let ventas: Observable<Venta[]> = this.httpSvc.listarVentas();
    ventas.subscribe((payload: Venta[]) => {
      this.ventas$ = of(payload);
    }, err => {
      console.log(err);
      this.ventas$ = of([]);
    }, () => {
      this.loading$ = of(false);
      this.busy$ = of(false);
    });
    return from(ventas);
  }

  public onClickAgregar(): void {
    this.busy$ = of(true);
    this.dialog.open(VentaFormularioComponent, {
      width: "80rem",
      height: "28rem"
    }).afterClosed().subscribe(
      (nuevo: Venta) => {
        if (nuevo) {
          this.cargarVentas();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickEditar(vnt: Venta): void {
    this.busy$ = of(true);
    const dialogData: VentaFormularioDialogData = {
      venta: vnt
    };

    this.dialog.open(VentaFormularioComponent, {
      width: "40rem",
      height: "28rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: Venta) => {
        if (editado) {
          this.cargarVentas();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickBorrar(vnt: Venta) {
    this.busy$ = of(true);
    this.httpSvc.borrarVenta(vnt.idVenta).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Venta N°'"+vnt.idVenta+"' ("+vnt.fechaVenta+") eliminada.");
        } else {
          this.snackBar.open("Hubo un problema al borrar la venta.");
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
