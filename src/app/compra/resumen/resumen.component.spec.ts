import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraResumenComponent } from './resumen.component';

describe('CompraResumenComponent', () => {
  let component: CompraResumenComponent;
  let fixture: ComponentFixture<CompraResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
