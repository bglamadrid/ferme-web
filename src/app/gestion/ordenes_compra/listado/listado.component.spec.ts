import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesCompraListadoComponent } from './listado.component';

describe('EmpleadosListadoComponent', () => {
  let component: OrdenesCompraListadoComponent;
  let fixture: ComponentFixture<OrdenesCompraListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesCompraListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesCompraListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
