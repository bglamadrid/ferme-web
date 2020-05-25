import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaFormDialogGestionComponent } from './venta-form-dialog.component';

describe('VentaFormDialogGestionComponent', () => {
  let component: VentaFormDialogGestionComponent;
  let fixture: ComponentFixture<VentaFormDialogGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaFormDialogGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaFormDialogGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
