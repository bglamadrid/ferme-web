import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFormularioComponent } from './formulario.component';

describe('FormularioComponent', () => {
  let component: ClienteFormularioComponent;
  let fixture: ComponentFixture<ClienteFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
