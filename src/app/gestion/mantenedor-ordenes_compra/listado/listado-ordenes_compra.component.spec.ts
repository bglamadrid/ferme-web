import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrdenesCompraGestionComponent } from './listado-ordenes_compra.component';

describe('ListadoOrdenesCompraGestionComponent', () => {
  let component: ListadoOrdenesCompraGestionComponent;
  let fixture: ComponentFixture<ListadoOrdenesCompraGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoOrdenesCompraGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoOrdenesCompraGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
