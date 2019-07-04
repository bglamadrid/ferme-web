import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Proveedor } from 'src/modelo/Proveedor';
import { ProveedoresListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProveedorFormularioComponent, ProveedorFormularioDialogData } from './formulario/formulario.component';
import { ProveedoresHttpService } from 'src/http-services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ProveedoresComponent implements OnInit {

  protected _proveedores: Proveedor[];
  protected _proveedoresSource: Subject<Proveedor[]>;
  public proveedores$: Observable<Proveedor[]>;

  protected _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  protected _busySource: Subject<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: ProveedoresListadoComponent;

  constructor(
    protected httpSvc: ProveedoresHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    this._proveedores = [];
    this._proveedoresSource = new Subject<Proveedor[]>();
    this.proveedores$ = this._proveedoresSource.asObservable();
    
    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();

    this._busySource = new Subject<boolean>();
    this.busy$ = this._busySource.asObservable();
  }

  ngOnInit() {
    this.cargarProveedores();
  }

  protected cargarProveedores(): Observable<Proveedor[]> {
    this._loadingSource.next(true);
    let proveedores: Observable<Proveedor[]> = this.httpSvc.listarProveedores();
    proveedores.subscribe((payload: Proveedor[]) => {
      this._proveedores = payload;
      this._proveedoresSource.next(payload);
    }, err => {
      console.log(err);
      this._proveedores = [];
      this._proveedoresSource.next([]);
    }, () => {
      this._loadingSource.next(false);
      this._busySource.next(false);
    });
    return from(proveedores);
  }

  public onClickAgregar(): void {
    this._busySource.next(true);
    this.dialog.open(ProveedorFormularioComponent, {
      width: "40rem",
      height: "29rem"
    }).afterClosed().subscribe(
      (nuevo: Proveedor) => {
        if (nuevo) {
          this.cargarProveedores();
        }
      },
      err => { console.log(err); },
      () => { this._busySource.next(false); }
    );
  }

  public onClickEditar(prov: Proveedor): void {
    this._busySource.next(true);
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
      () => { this._busySource.next(false); }
    );
  }

  public onClickBorrar(prov: Proveedor) {
    this._busySource.next(true);
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
       () => { this._busySource.next(false); }
    );
  }

}
