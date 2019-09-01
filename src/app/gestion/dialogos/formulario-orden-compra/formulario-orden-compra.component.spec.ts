import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraFormularioDialogComponent } from './formulario-orden-compra.component';

describe('FormularioComponent', () => {
  let component: OrdenCompraFormularioDialogComponent;
  let fixture: ComponentFixture<OrdenCompraFormularioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenCompraFormularioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenCompraFormularioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
