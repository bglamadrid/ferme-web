import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorClientesGestionComponent } from './mantenedor-clientes.component';

describe('MantenedorClientesGestionComponent', () => {
  let component: MantenedorClientesGestionComponent;
  let fixture: ComponentFixture<MantenedorClientesGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorClientesGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorClientesGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
