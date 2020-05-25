import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClientesGestionComponent } from './listado-clientes.component';

describe('ListadoClientesGestionComponent', () => {
  let component: ListadoClientesGestionComponent;
  let fixture: ComponentFixture<ListadoClientesGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoClientesGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoClientesGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
