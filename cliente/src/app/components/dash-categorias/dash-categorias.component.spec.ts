import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCategoriasComponent } from './dash-categorias.component';

describe('DashCategoriasComponent', () => {
  let component: DashCategoriasComponent;
  let fixture: ComponentFixture<DashCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
