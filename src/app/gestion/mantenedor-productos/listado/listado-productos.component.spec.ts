import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProductosGestionComponent } from './listado-productos.component';

describe('ListadoProductosGestionComponent', () => {
  let component: ListadoProductosGestionComponent;
  let fixture: ComponentFixture<ListadoProductosGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoProductosGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProductosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
