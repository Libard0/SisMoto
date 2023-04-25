import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProdMantenimientosComponent } from './dash-prod-mantenimientos.component';

describe('DashProdMantenimientosComponent', () => {
  let component: DashProdMantenimientosComponent;
  let fixture: ComponentFixture<DashProdMantenimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashProdMantenimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProdMantenimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
