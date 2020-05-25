import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEmpleadosGestionComponent } from './listado-empleados.component';

describe('ListadoEmpleadosGestionComponent', () => {
  let component: ListadoEmpleadosGestionComponent;
  let fixture: ComponentFixture<ListadoEmpleadosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEmpleadosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEmpleadosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
