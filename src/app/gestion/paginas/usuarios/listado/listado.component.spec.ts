import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresListadoComponent } from './listado.component';

describe('EmpleadosListadoComponent', () => {
  let component: ProveedoresListadoComponent;
  let fixture: ComponentFixture<ProveedoresListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
