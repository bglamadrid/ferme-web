import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: CompraDashboardComponent;
  let fixture: ComponentFixture<CompraDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
