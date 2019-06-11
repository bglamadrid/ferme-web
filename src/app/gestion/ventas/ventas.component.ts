import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Venta } from 'src/models/Venta';
import { VentasListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { VentaFormularioComponent, VentaFormularioDialogData } from './formulario/formulario.component';
import { VentasHttpService } from 'src/http-services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public ventas$: Observable<Venta[]>;
  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: VentasListadoComponent;

  constructor(
    private httpSvc: VentasHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.loading$ = of(true);
    this.busy$ = of(true);
  }

  ngOnInit() {
    this.cargarVentas();
  }

  private cargarVentas(): Observable<Venta[]> {
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

  public onClickAgregarVenta(): void {
    this.busy$ = of(true);
    this.dialog.open(VentaFormularioComponent, {
      width: "40rem",
      height: "37rem"
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

  public onClickEditarVenta(vnt: Venta): void {
    this.busy$ = of(true);
    const dialogData: VentaFormularioDialogData = {
      venta: vnt
    };

    this.dialog.open(VentaFormularioComponent, {
      width: "40rem",
      height: "37rem",
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

  public onClickBorrarVenta(vnt: Venta) {
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
