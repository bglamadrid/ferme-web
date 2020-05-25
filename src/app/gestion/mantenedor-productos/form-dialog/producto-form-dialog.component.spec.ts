import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormDialogGestionComponent } from './producto-form-dialog.component';

describe('ProductoFormDialogGestionComponent', () => {
  let component: ProductoFormDialogGestionComponent;
  let fixture: ComponentFixture<ProductoFormDialogGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoFormDialogGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFormDialogGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
