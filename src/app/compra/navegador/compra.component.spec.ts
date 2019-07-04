import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraNavegadorComponent } from './compra.component';

describe('CompraNavegadorComponent', () => {
  let component: CompraNavegadorComponent;
  let fixture: ComponentFixture<CompraNavegadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraNavegadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraNavegadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
