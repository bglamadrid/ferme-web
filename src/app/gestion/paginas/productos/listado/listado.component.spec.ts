import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosListadoComponent } from './listado.component';

describe('ListadoComponent', () => {
  let component: ProductosListadoComponent;
  let fixture: ComponentFixture<ProductosListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
