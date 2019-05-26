import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInicioComponent } from './inicio.component';

describe('InicioComponent', () => {
  let component: GestionInicioComponent;
  let fixture: ComponentFixture<GestionInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
