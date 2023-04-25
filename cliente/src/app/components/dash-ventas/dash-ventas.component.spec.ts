import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashVentasComponent } from './dash-ventas.component';

describe('DashVentasComponent', () => {
  let component: DashVentasComponent;
  let fixture: ComponentFixture<DashVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
