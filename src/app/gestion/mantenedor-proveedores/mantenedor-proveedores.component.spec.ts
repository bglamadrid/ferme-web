import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorProveedoresGestionComponent } from './mantenedor-proveedores.component';

describe('MantenedorProveedoresGestionComponent', () => {
  let component: MantenedorProveedoresGestionComponent;
  let fixture: ComponentFixture<MantenedorProveedoresGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorProveedoresGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorProveedoresGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
