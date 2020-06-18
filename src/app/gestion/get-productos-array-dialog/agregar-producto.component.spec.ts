import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoDialogComponent } from './agregar-producto.component';

describe('AgregarProductoDialogComponent', () => {
  let component: AgregarProductoDialogComponent;
  let fixture: ComponentFixture<AgregarProductoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProductoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
