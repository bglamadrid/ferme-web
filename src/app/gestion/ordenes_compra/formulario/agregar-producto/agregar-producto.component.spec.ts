import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoOrdenCompraComponent } from './agregar-producto.component';

describe('AgregarProductoComponent', () => {
  let component: AgregarProductoOrdenCompraComponent;
  let fixture: ComponentFixture<AgregarProductoOrdenCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProductoOrdenCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
