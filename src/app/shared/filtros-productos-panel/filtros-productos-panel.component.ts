import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { SharedDataService } from 'src/data/shared.data.iservice';
import { FamiliaProducto } from 'src/models/entities/FamiliaProducto';
import { TipoProducto } from 'src/models/entities/TipoProducto';

export interface FiltrosProductos {
  nombre?: string;
  tipo?: number;
  familia?: number;
}

@Component({
  selector: 'app-filtros-productos-panel',
  templateUrl: './filtros-productos-panel.component.html',
  styleUrls: [
    '../../../assets/styles/formularios.css',
    './filtros-productos-panel.component.css'
  ]
})
export class FiltrosProductosPanelComponent
  implements OnInit, OnDestroy {

  protected _changeFamiliasSub: Subscription;
  protected _changeTipoSub: Subscription;
  protected _changeNombreSub: Subscription;

  @Output() public filtrosChange: EventEmitter<FiltrosProductos>;

  public productoForm: FormGroup;
  public familias$: Observable<FamiliaProducto[]>;
  public tipos$: Observable<TipoProducto[]>;

  constructor(
    @Inject(DATA_SERVICE_ALIASES.shared) protected sharedDataService: SharedDataService,
    protected formBuilder: FormBuilder
  ) {
    this.filtrosChange = new EventEmitter<FiltrosProductos>();

    this.productoForm = this.formBuilder.group({
      familia: [null],
      tipo: [{value: null, disabled: true}],
      nombre: ['']
    });
  }

  public get familia() { return this.productoForm.get('familia'); }
  public get tipo() { return this.productoForm.get('tipo'); }
  public get nombre() { return this.productoForm.get('nombre'); }

  ngOnInit() {
    this.familias$ = this.sharedDataService.readAllFamiliasProducto();

    this._changeFamiliasSub = this.familia.valueChanges.subscribe(() => { this.onChangeFamilia(); });
    this._changeTipoSub = this.tipo.valueChanges.subscribe(() => { this.emitirFiltros(); });
    this._changeNombreSub = this.nombre.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => { this.emitirFiltros(); });
  }

  ngOnDestroy() {
    if (this._changeFamiliasSub) { this._changeFamiliasSub.unsubscribe(); }
    if (this._changeTipoSub) { this._changeTipoSub.unsubscribe(); }
    if (this._changeNombreSub) { this._changeTipoSub.unsubscribe(); }
  }

  protected resetTipo(): void {
    this.tipos$ = of([]);
    this.tipo.reset();
    this.tipo.disable();
  }

  protected emitirFiltros(): void {
    this.productoForm.updateValueAndValidity();
    const filtros: FiltrosProductos = {};

    if (this.nombre.value) {
      filtros.nombre = this.nombre.value;
    }
    if (this.tipo.value) {
      filtros.tipo = this.tipo.value;
    }
    if (this.familia.value) {
      filtros.familia = this.familia.value;
    }

    this.filtrosChange.emit(filtros);
  }

  protected onChangeFamilia(): void {
    const idTipoProductoSeleccionado: number = this.tipo.value;
    if (this.familia.value) {
      if (this.tipo.enabled) { this.tipo.disable(); }

      const idFamilia: number = Number(this.familia.value);
      if (!isNaN(idFamilia)) {
        this.emitirFiltros();
        this.sharedDataService.readAllTiposProductoByFamiliaId(idFamilia).subscribe(
          (tipos: TipoProducto[]) => {
            if (tipos && tipos.length > 0) {
              this.tipos$ = of(tipos);
              this.tipo.enable();
              if (idTipoProductoSeleccionado && !tipos.some(tp => tp.id === idTipoProductoSeleccionado)) {
                this.tipo.reset();
              }
            } else {
              this.resetTipo();
            }
          },
          err => {
            this.tipo.reset();
            this.tipo.disable();
          }
        );
        return;
      }
    }

    this.resetTipo();
  }

  public onClickLimpiarFamilia(ev: any): void {
    this.familia.reset();
    ev.stopPropagation();
  }

  public onClickLimpiarTipo(ev: any): void {
    this.tipo.reset();
    ev.stopPropagation();
  }

}
