import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuariosGestionComponent } from './listado-usuarios.component';

describe('ListadoUsuariosGestionComponent', () => {
  let component: ListadoUsuariosGestionComponent;
  let fixture: ComponentFixture<ListadoUsuariosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoUsuariosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoUsuariosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
