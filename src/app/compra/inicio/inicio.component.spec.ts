import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraInicioComponent } from './inicio.component';

describe('InicioComponent', () => {
  let component: CompraInicioComponent;
  let fixture: ComponentFixture<CompraInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
