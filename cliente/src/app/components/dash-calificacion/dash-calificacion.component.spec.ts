import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCalificacionComponent } from './dash-calificacion.component';

describe('DashCalificacionComponent', () => {
  let component: DashCalificacionComponent;
  let fixture: ComponentFixture<DashCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCalificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
