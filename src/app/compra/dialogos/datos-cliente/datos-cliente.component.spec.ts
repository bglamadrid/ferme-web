import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDatosClienteDialogComponent } from './datos-cliente.component';

describe('DatosPersonalesComponent', () => {
  let component: CompraDatosClienteDialogComponent;
  let fixture: ComponentFixture<CompraDatosClienteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraDatosClienteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDatosClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
