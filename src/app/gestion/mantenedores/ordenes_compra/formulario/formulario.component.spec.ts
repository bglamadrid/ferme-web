import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaFormularioComponent } from './formulario.component';

describe('FormularioComponent', () => {
  let component: VentaFormularioComponent;
  let fixture: ComponentFixture<VentaFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
