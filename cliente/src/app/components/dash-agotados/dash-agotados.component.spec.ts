import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAgotadosComponent } from './dash-agotados.component';

describe('DashAgotadosComponent', () => {
  let component: DashAgotadosComponent;
  let fixture: ComponentFixture<DashAgotadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAgotadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAgotadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
