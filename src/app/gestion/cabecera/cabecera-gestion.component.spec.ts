import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraGestionComponent } from './cabecera-gestion.component';

describe('CabeceraGestionComponent', () => {
  let component: CabeceraGestionComponent;
  let fixture: ComponentFixture<CabeceraGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
