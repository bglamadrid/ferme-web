import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDatosPersonaComponent } from './formulario-datos-persona.component';

describe('FormularioDatosPersonaComponent', () => {
  let component: FormularioDatosPersonaComponent;
  let fixture: ComponentFixture<FormularioDatosPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioDatosPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDatosPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
