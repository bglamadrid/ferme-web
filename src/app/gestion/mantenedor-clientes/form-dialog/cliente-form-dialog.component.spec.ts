import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFormDialogGestionComponent } from './cliente-form-dialog.component';

describe('ClienteFormDialogGestionComponent', () => {
  let component: ClienteFormDialogGestionComponent;
  let fixture: ComponentFixture<ClienteFormDialogGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFormDialogGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFormDialogGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
