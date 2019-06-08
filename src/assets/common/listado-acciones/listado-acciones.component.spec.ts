import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAccionesComponent } from './listado-acciones.component';

describe('ListadoAccionesComponent', () => {
  let component: ListadoAccionesComponent;
  let fixture: ComponentFixture<ListadoAccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoAccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
