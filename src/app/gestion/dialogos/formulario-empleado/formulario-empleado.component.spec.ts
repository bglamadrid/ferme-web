import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFormularioDialogComponent } from './formulario-empleado.component';

describe('FormularioComponent', () => {
  let component: EmpleadoFormularioDialogComponent;
  let fixture: ComponentFixture<EmpleadoFormularioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoFormularioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoFormularioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
