import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificanosComponent } from './calificanos.component';

describe('CalificanosComponent', () => {
  let component: CalificanosComponent;
  let fixture: ComponentFixture<CalificanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificanosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
