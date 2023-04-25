import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRotacionComponent } from './dash-rotacion.component';

describe('DashRotacionComponent', () => {
  let component: DashRotacionComponent;
  let fixture: ComponentFixture<DashRotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashRotacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashRotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
