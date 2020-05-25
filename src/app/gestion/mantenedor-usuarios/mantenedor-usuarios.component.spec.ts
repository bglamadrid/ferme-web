import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorUsuariosGestionComponent } from './mantenedor-usuarios.component';

describe('MantenedorUsuariosGestionComponent', () => {
  let component: MantenedorUsuariosGestionComponent;
  let fixture: ComponentFixture<MantenedorUsuariosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorUsuariosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorUsuariosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
