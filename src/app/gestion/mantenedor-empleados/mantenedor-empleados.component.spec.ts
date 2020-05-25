import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorEmpleadosGestionComponent } from './mantenedor-empleados.component';

describe('MantenedorEmpleadosGestionComponent', () => {
  let component: MantenedorEmpleadosGestionComponent;
  let fixture: ComponentFixture<MantenedorEmpleadosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorEmpleadosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorEmpleadosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
