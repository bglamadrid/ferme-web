import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormDialogGestionComponent } from './usuario-form-dialog.component';

describe('UsuarioFormDialogGestionComponent', () => {
  let component: UsuarioFormDialogGestionComponent;
  let fixture: ComponentFixture<UsuarioFormDialogGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioFormDialogGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormDialogGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
