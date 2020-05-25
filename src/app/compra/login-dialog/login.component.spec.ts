import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraLoginDialogComponent } from './login.component';

describe('LoginComponent', () => {
  let component: CompraLoginDialogComponent;
  let fixture: ComponentFixture<CompraLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
