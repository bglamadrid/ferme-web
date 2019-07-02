import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGestionComponent } from './listado.component';

describe('ListadoGestionComponent', () => {
  let component: ListadoGestionComponent;
  let fixture: ComponentFixture<ListadoGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
