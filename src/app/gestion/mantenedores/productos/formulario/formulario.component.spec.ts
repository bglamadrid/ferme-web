import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormularioComponent } from './formulario.component';

describe('FormularioComponent', () => {
  let component: ProductoFormularioComponent;
  let fixture: ComponentFixture<ProductoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
