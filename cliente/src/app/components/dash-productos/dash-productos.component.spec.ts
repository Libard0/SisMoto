import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProductosComponent } from './dash-productos.component';

describe('DashProductosComponent', () => {
  let component: DashProductosComponent;
  let fixture: ComponentFixture<DashProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
