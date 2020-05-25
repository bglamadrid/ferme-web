import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosProductosPanelComponent } from './filtros-productos-panel.component';

describe('FiltrosProductosPanelComponent', () => {
  let component: FiltrosProductosPanelComponent;
  let fixture: ComponentFixture<FiltrosProductosPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosProductosPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosProductosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
