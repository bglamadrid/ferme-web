import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaFormularioDialogComponent } from './formulario-venta.component';

describe('FormularioComponent', () => {
  let component: VentaFormularioDialogComponent;
  let fixture: ComponentFixture<VentaFormularioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaFormularioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaFormularioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
