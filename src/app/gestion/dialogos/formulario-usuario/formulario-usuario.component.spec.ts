import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormularioDialogComponent } from './formulario-usuario.component';

describe('FormularioComponent', () => {
  let component: UsuarioFormularioDialogComponent;
  let fixture: ComponentFixture<UsuarioFormularioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioFormularioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormularioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
