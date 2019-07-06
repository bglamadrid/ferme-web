import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject, BehaviorSubject } from 'rxjs';
import { Producto } from 'src/modelo/Producto';
import { ProductosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { ProductoFormularioComponent, ProductoFormularioDialogData } from './formulario/formulario.component';
import { ProductosHttpService } from 'src/http-services/productos.service';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class MantenedorProductosComponent 
  extends MantenedorGestionComponent<Producto> {

  @ViewChild("listado") public listado: ProductosListadoComponent;

  constructor(
    protected httpSvc: ProductosHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    super();
  }

  public cargarItems(): Observable<Producto[]> {
    return this.httpSvc.listarProductos();
  }

  public abrirDialogoEdicion(item: Producto): Observable<Producto> {

    let dialogConfig: MatDialogConfig = {
      width: "40rem",
      height: "28rem"
    };

    if (item) {
      let dialogData: ProductoFormularioDialogData = { producto: item };
      dialogConfig.data = dialogData;
    }
    
    let dialog = this.dialog.open(ProductoFormularioComponent, dialogConfig);
    
    return from(dialog.afterClosed());
  };

  public onClickBorrar(prod: Producto) {
    this._ocupado$.next(true);
    this.httpSvc.borrarProducto(prod.idProducto).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Producto '"+prod.nombreProducto+"' eliminado.");
          this.onCargar();
        } else {
          this.snackBar.open("Hubo un problema al borrar el producto.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.");
        console.log(err); 
      },
      () => { this._ocupado$.next(false); }
    );
  }

}
