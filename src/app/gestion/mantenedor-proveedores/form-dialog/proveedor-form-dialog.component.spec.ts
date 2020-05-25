import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormDialogGestionComponent } from './proveedor-form-dialog.component';

describe('ProveedorFormDialogGestionComponent', () => {
  let component: ProveedorFormDialogGestionComponent;
  let fixture: ComponentFixture<ProveedorFormDialogGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorFormDialogGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorFormDialogGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
