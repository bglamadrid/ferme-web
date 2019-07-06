import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorUsuariosComponent } from './usuarios.component';

describe('UsuariosComponent', () => {
  let component: MantenedorUsuariosComponent;
  let fixture: ComponentFixture<MantenedorUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
