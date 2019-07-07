import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Cliente } from 'src/modelo/Cliente';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN } from 'src/app/compartido/constantes';
import { ClientesHttpService } from 'src/http-services/clientes.service';

export interface CompraDatosClienteDialogData {
  cliente: Cliente
}

@Component({
  selector: 'app-compra-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './datos-cliente.component.css'
  ]
})
export class CompraDatosClienteDialogComponent implements OnInit {

  protected _idCliente: number;
  protected _idPersona: number;
  public clienteForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: CompraDatosClienteDialogData,
    protected self: MatDialogRef<CompraDatosClienteDialogComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected httpSvc: ClientesHttpService
  ) { 

    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: [''],
      email: [''],
      fono1: [''],
      fono2: [''],  
      fono3: ['']
    });

    if (this.dialogData) {
      const cli: Cliente = this.dialogData.cliente;
      if (cli) { this.cargarCliente(cli); }
    }
  }

  public get nombre() { return this.clienteForm.get("nombre"); }
  public get rut() { return this.clienteForm.get("rut"); }
  public get direccion() { return this.clienteForm.get("direccion"); }
  public get email() { return this.clienteForm.get("email"); }
  public get fono1() { return this.clienteForm.get("fono1"); }
  public get fono2() { return this.clienteForm.get("fono2"); }
  public get fono3() { return this.clienteForm.get("fono3"); }

  ngOnInit() {
  }


  protected cargarCliente(cli: Cliente): void {

    this.clienteForm.disable(NO_EVENT_CHAIN);

    if (cli.idCliente) {
      this._idCliente = cli.idCliente; 
    }
    if (cli.idPersona) {
      this._idPersona = cli.idPersona;
    }

    this.nombre.setValue(cli.nombreCompletoPersona, NO_EVENT_CHAIN);
    this.rut.setValue(cli.rutPersona, NO_EVENT_CHAIN);

    if (cli.direccionPersona) {
      this.direccion.setValue(cli.direccionPersona, NO_EVENT_CHAIN);
    }
    if (cli.emailPersona) {
      this.email.setValue(cli.emailPersona, NO_EVENT_CHAIN);
    }
    if (cli.fonoPersona1) {
      this.fono1.setValue(String(cli.fonoPersona1), NO_EVENT_CHAIN);
    }
    if (cli.fonoPersona2) {
      this.fono2.setValue(String(cli.fonoPersona2), NO_EVENT_CHAIN);
    }
    if (cli.fonoPersona3) {
      this.fono3.setValue(String(cli.fonoPersona3), NO_EVENT_CHAIN);
    }

    this.clienteForm.enable();
  }

  protected guardarCliente(cli: Cliente): void {
    this.clienteForm.disable(NO_EVENT_CHAIN);
    
    this.httpSvc.guardarCliente(cli).subscribe(
      (id: number) => {
        if (id) {
          if (cli.idCliente) {
            this.snackBar.open("Hemos actualizado sus datos exitosamente.");
          } else {
            this.snackBar.open("Hemos registrado sus datos exitosamente.");
          }
          cli.idCliente = id;
          this.self.close(cli);
        } else {
          this.snackBar.open("Hubo un error para guardar sus datos, por favor inténtelo de nuevo.");
        }
      }, err => {
        console.log(err);
        this.snackBar.open("Hubo un error para guardar sus datos, por favor inténtelo de nuevo.");
        this.clienteForm.enable(NO_EVENT_CHAIN);
      }
    );
  }

  public onClickAceptar(): void {
    let nuevo: Cliente = {
      idCliente: this._idCliente? this._idCliente : null,
      idPersona: this._idPersona? this._idPersona: null,
      nombreCompletoPersona: this.nombre.value,
      rutPersona: this.rut.value,
      direccionPersona: this.direccion.value? this.direccion.value : null,
      emailPersona: this.email.value? this.email.value : null,
      fonoPersona1: this.fono1.value? this.fono1.value : null,
      fonoPersona2: this.fono2.value? this.fono2.value : null,
      fonoPersona3: this.fono3.value? this.fono3.value : null,
    };

    this.guardarCliente(nuevo);
  }

  public onClickCancelar() {
    this.self.close(null);
  }
}
