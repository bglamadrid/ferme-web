import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresGestionComponent } from './proveedores.component';

describe('EmpleadosComponent', () => {
  let component: ProveedoresGestionComponent;
  let fixture: ComponentFixture<ProveedoresGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
