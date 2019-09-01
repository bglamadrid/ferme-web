import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosGestionComponent } from './usuarios.component';

describe('UsuariosComponent', () => {
  let component: UsuariosGestionComponent;
  let fixture: ComponentFixture<UsuariosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
