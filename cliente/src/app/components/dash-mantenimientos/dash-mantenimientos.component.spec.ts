import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMantenimientosComponent } from './dash-mantenimientos.component';

describe('DashMantenimientosComponent', () => {
  let component: DashMantenimientosComponent;
  let fixture: ComponentFixture<DashMantenimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashMantenimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashMantenimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
