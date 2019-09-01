import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormularioDialogComponent } from './formulario-proveedor.component';

describe('FormularioComponent', () => {
  let component: ProveedorFormularioDialogComponent;
  let fixture: ComponentFixture<ProveedorFormularioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorFormularioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorFormularioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
