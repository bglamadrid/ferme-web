import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Cargo } from 'src/models/Cargo';
import { Proveedor } from 'src/models/Proveedor';
import { GestionSharedHttpService } from '../../../../http-services/gestion-shared.service';
import { ProveedoresHttpService } from 'src/http-services/proveedores.service';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN } from 'src/assets/common/Constants';

export interface ProveedorFormularioDialogData {
  proveedor: Proveedor;
}

@Component({
  selector: 'app-proveedores-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['../../../../assets/formularios.css']
})
export class ProveedorFormularioComponent implements OnInit {

  private _idProveedor: number;
  private _idPersona: number;

  public cargos$: Observable<Cargo[]>;
  public showSpinner$: Observable<boolean>;

  public proveedorForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: ProveedorFormularioDialogData,
    private self: MatDialogRef<ProveedorFormularioComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private sharedSvc: GestionSharedHttpService,
    private httpSvc: ProveedoresHttpService
  ) { 
    this.showSpinner$ = of(true);

    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      razonSocial: [null, Validators.required],
      direccion: [''],
      email: [''],
      fono1: [''],
      fono2: [''],  
      fono3: ['']
    });

    if (this.dialogData) {
      const prov: Proveedor = this.dialogData.proveedor;
      if (prov) { this.cargarProveedor(prov); }
    }
  }

  public get nombre() { return this.proveedorForm.get("nombre"); }
  public get rut() { return this.proveedorForm.get("rut"); }
  public get razonSocial() { return this.proveedorForm.get("razonSocial"); }
  public get direccion() { return this.proveedorForm.get("direccion"); }
  public get email() { return this.proveedorForm.get("email"); }
  public get fono1() { return this.proveedorForm.get("fono1"); }
  public get fono2() { return this.proveedorForm.get("fono2"); }
  public get fono3() { return this.proveedorForm.get("fono3"); }

  public get esNuevo() { return !isNaN(this._idProveedor); }

  ngOnInit() {
    this.cargos$ = this.sharedSvc.cargos();
  }

  private cargarProveedor(prov: Proveedor): void {

    this.proveedorForm.disable(NO_EVENT_CHAIN);
    this.showSpinner$ = of(true);

    if (prov.idProveedor) {
      this._idProveedor = prov.idProveedor; 
    }
    if (prov.idPersona) {
      this._idPersona = prov.idPersona;
    }

    this.nombre.setValue(prov.nombreCompletoPersona, NO_EVENT_CHAIN);
    this.rut.setValue(prov.rutPersona, NO_EVENT_CHAIN);
    this.razonSocial.setValue(prov.razonSocialProveedor, NO_EVENT_CHAIN);

    if (prov.direccionPersona) {
      this.direccion.setValue(prov.direccionPersona, NO_EVENT_CHAIN);
    }
    if (prov.emailPersona) {
      this.email.setValue(prov.emailPersona, NO_EVENT_CHAIN);
    }
    if (prov.fonoPersona1) {
      this.fono1.setValue(String(prov.fonoPersona1), NO_EVENT_CHAIN);
    }
    if (prov.fonoPersona2) {
      this.fono2.setValue(String(prov.fonoPersona2), NO_EVENT_CHAIN);
    }
    if (prov.fonoPersona3) {
      this.fono3.setValue(String(prov.fonoPersona3), NO_EVENT_CHAIN);
    }

    this.showSpinner$ = of(false);
    this.proveedorForm.enable();
  }

  private guardarProveedor(prov: Proveedor): void {
    this.proveedorForm.disable(NO_EVENT_CHAIN);
    this.showSpinner$ = of(true);
    
    this.httpSvc.guardarProveedor(prov).subscribe(
      (id: number) => {
        if (id) {
          if (prov.idProveedor) {
            this.snackBar.open("Proveedor '"+prov.nombreCompletoPersona+"' actualizado/a exitosamente.");
          } else {
            this.snackBar.open("Proveedor '"+prov.nombreCompletoPersona+"' registrado/a exitosamente.");
          }
          prov.idProveedor = id;
          this.self.close(prov);
        } else {
          this.snackBar.open("Error al guardar proveedor.");
        }
      }, err => {
        console.log(err);
        this.snackBar.open("Error al guardar proveedor.");
        this.showSpinner$ = of(false);
        this.proveedorForm.enable(NO_EVENT_CHAIN);
      }
    );
  }

  public onClickAceptar(): void {
    let nuevo: Proveedor = {
      idProveedor: this._idProveedor? this._idProveedor : null,
      idPersona: this._idPersona? this._idPersona: null,
      razonSocialProveedor: this.razonSocial.value,
      nombreCompletoPersona: this.nombre.value,
      rutPersona: this.rut.value,
      direccionPersona: this.direccion.value? this.direccion.value : null,
      emailPersona: this.email.value? this.email.value : null,
      fonoPersona1: this.fono1.value? this.fono1.value : null,
      fonoPersona2: this.fono2.value? this.fono2.value : null,
      fonoPersona3: this.fono3.value? this.fono3.value : null,
    };

    this.guardarProveedor(nuevo);
  }

  public onClickCancelar(): void {
    this.self.close();
  }

  @Input() public set Proveedor(prov: Proveedor) {
    if (prov) {
      this.cargarProveedor(prov);
    } else {
      this.proveedorForm.reset();
    }
  }

}
