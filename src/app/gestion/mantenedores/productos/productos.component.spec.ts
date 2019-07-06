import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorProductosComponent } from './productos.component';

describe('ProductosComponent', () => {
  let component: MantenedorProductosComponent;
  let fixture: ComponentFixture<MantenedorProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
