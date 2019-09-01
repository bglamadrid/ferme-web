import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesGestionComponent } from './clientes.component';

describe('ClientesComponent', () => {
  let component: ClientesGestionComponent;
  let fixture: ComponentFixture<ClientesGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
