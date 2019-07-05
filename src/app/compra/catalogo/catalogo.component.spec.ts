import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraCatalogoComponent } from './catalogo.component';

describe('CatalogoComponent', () => {
  let component: CompraCatalogoComponent;
  let fixture: ComponentFixture<CompraCatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraCatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
