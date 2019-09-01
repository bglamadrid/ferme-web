import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFormularioDialogComponent } from './formulario-cliente.component';

describe('FormularioComponent', () => {
  let component: ClienteFormularioDialogComponent;
  let fixture: ComponentFixture<ClienteFormularioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFormularioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFormularioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
