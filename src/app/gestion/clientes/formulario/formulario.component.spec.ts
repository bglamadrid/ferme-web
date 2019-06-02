import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFormularioComponent } from './formulario.component';

describe('FormularioComponent', () => {
  let component: ClientesFormularioComponent;
  let fixture: ComponentFixture<ClientesFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
