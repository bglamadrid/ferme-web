import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGestionComponent } from './resumen.component';

describe('DashboardComponent', () => {
  let component: ResumenGestionComponent;
  let fixture: ComponentFixture<ResumenGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
