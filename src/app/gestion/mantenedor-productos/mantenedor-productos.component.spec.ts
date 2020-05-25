import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorProductosGestionComponent } from './mantenedor-productos.component';

describe('MantenedorProductosGestionComponent', () => {
  let component: MantenedorProductosGestionComponent;
  let fixture: ComponentFixture<MantenedorProductosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorProductosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorProductosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
