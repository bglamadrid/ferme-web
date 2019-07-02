import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Proveedor } from 'src/models/Proveedor';
import { ProveedoresListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProveedorFormularioComponent, ProveedorFormularioDialogData } from './formulario/formulario.component';
import { ProveedoresHttpService } from 'src/http-services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: [
    '../../../assets/gestion-pages.css'
  ]
})
export class ProveedoresComponent implements OnInit {

  public proveedores$: Observable<Proveedor[]>;
  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: ProveedoresListadoComponent;

  constructor(
    private httpSvc: ProveedoresHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.loading$ = of(true);
    this.busy$ = of(true);
  }

  ngOnInit() {
    this.cargarProveedores();
  }

  private cargarProveedores(): Observable<Proveedor[]> {
    this.loading$ = of(true);
    let proveedores: Observable<Proveedor[]> = this.httpSvc.listarProveedores();
    proveedores.subscribe((payload: Proveedor[]) => {
      this.proveedores$ = of(payload);
    }, err => {
      console.log(err);
      this.proveedores$ = of([]);
    }, () => {
      this.loading$ = of(false);
      this.busy$ = of(false);
    });
    return from(proveedores);
  }

  public onClickAgregar(): void {
    this.busy$ = of(true);
    this.dialog.open(ProveedorFormularioComponent, {
      width: "40rem",
      height: "28rem"
    }).afterClosed().subscribe(
      (nuevo: Proveedor) => {
        if (nuevo) {
          this.cargarProveedores();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickEditar(prov: Proveedor): void {
    this.busy$ = of(true);
    const dialogData: ProveedorFormularioDialogData = {
      proveedor: prov
    };

    this.dialog.open(ProveedorFormularioComponent, {
      width: "40rem",
      height: "28rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: Proveedor) => {
        if (editado) {
          this.cargarProveedores();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickBorrar(prov: Proveedor) {
    this.busy$ = of(true);
    this.httpSvc.borrarProveedor(prov.idProveedor).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Proveedor '"+prov.nombreCompletoPersona+"' eliminado.");
        } else {
          this.snackBar.open("Hubo un problema al borrar el empleado.");
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
