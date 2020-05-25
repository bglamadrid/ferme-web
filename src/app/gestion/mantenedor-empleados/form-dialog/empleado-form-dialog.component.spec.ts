import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFormDialogGestionComponent } from './empleado-form-dialog.component';

describe('EmpleadoFormDialogGestionComponent', () => {
  let component: EmpleadoFormDialogGestionComponent;
  let fixture: ComponentFixture<EmpleadoFormDialogGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoFormDialogGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoFormDialogGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
