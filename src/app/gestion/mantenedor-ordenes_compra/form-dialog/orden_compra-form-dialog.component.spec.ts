import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraFormDialogGestionComponent } from './orden_compra-form-dialog.component';

describe('OrdenCompraFormDialogGestionComponent', () => {
  let component: OrdenCompraFormDialogGestionComponent;
  let fixture: ComponentFixture<OrdenCompraFormDialogGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenCompraFormDialogGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenCompraFormDialogGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
