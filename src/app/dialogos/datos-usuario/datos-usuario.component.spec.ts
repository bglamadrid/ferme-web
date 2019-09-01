import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosUsuarioDialogComponent } from './datos-usuario.component';

describe('DatosUsuarioComponent', () => {
  let component: DatosUsuarioDialogComponent;
  let fixture: ComponentFixture<DatosUsuarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosUsuarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
