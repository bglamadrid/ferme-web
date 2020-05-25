import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorVentasGestionComponent } from './mantenedor-ventas.component';

describe('EmpleadosComponent', () => {
  let component: MantenedorVentasGestionComponent;
  let fixture: ComponentFixture<MantenedorVentasGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorVentasGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorVentasGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
