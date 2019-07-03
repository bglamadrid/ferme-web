import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasListadoComponent } from './listado.component';

describe('EmpleadosListadoComponent', () => {
  let component: VentasListadoComponent;
  let fixture: ComponentFixture<VentasListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
