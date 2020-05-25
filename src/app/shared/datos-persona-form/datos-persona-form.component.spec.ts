import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonaFormComponent } from './datos-persona-form.component';

describe('DatosPersonaFormComponent', () => {
  let component: DatosPersonaFormComponent;
  let fixture: ComponentFixture<DatosPersonaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPersonaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPersonaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
