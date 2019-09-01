import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormularioDialogComponent } from './formulario-producto.component';

describe('FormularioComponent', () => {
  let component: ProductoFormularioDialogComponent;
  let fixture: ComponentFixture<ProductoFormularioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoFormularioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFormularioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
