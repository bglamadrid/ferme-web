import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorVentasComponent } from './ventas.component';

describe('EmpleadosComponent', () => {
  let component: MantenedorVentasComponent;
  let fixture: ComponentFixture<MantenedorVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
