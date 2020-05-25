import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioFormDialogComponent } from './perfil-usuario-form-dialog.component';

describe('PerfilUsuarioFormDialogComponent', () => {
  let component: PerfilUsuarioFormDialogComponent<any>;
  let fixture: ComponentFixture<PerfilUsuarioFormDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
