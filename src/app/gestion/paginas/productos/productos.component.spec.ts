import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosGestionComponent } from './productos.component';

describe('ProductosComponent', () => {
  let component: ProductosGestionComponent;
  let fixture: ComponentFixture<ProductosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
