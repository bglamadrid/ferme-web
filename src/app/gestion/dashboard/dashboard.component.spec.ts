import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: GestionDashboardComponent;
  let fixture: ComponentFixture<GestionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
