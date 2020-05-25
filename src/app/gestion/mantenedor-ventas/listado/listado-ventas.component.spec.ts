import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVentasGestionComponent } from './listado-ventas.component';

describe('ListadoVentasGestionComponent', () => {
  let component: ListadoVentasGestionComponent;
  let fixture: ComponentFixture<ListadoVentasGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoVentasGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoVentasGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
