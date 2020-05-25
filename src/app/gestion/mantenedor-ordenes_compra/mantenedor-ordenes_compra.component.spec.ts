import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorOrdenesCompraGestionComponent } from './mantenedor-ordenes_compra.component';

describe('MantenedorOrdenesCompraGestionComponent', () => {
  let component: MantenedorOrdenesCompraGestionComponent;
  let fixture: ComponentFixture<MantenedorOrdenesCompraGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorOrdenesCompraGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorOrdenesCompraGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
