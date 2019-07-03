import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesListadoComponent } from './listado.component';

describe('ListadoComponent', () => {
  let component: ClientesListadoComponent;
  let fixture: ComponentFixture<ClientesListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
