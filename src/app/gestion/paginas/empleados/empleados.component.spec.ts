import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmpleadosComponent } from './empleados.component';

describe('EmpleadosComponent', () => {
  let component: GestionEmpleadosComponent;
  let fixture: ComponentFixture<GestionEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
