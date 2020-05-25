import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProveedoresGestionComponent } from './listado-proveedores.component';

describe('ListadoProveedoresGestionComponent', () => {
  let component: ListadoProveedoresGestionComponent;
  let fixture: ComponentFixture<ListadoProveedoresGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoProveedoresGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProveedoresGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
