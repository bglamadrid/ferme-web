import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNavegadorComponent } from './gestion.component';

describe('GestionNavegadorComponent', () => {
  let component: GestionNavegadorComponent;
  let fixture: ComponentFixture<GestionNavegadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionNavegadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNavegadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
