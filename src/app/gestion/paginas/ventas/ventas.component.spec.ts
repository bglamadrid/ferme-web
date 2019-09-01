import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasGestionComponent } from './ventas.component';

describe('EmpleadosComponent', () => {
  let component: VentasGestionComponent;
  let fixture: ComponentFixture<VentasGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
