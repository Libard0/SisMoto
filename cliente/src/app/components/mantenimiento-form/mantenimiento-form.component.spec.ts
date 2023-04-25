import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoFormComponent } from './mantenimiento-form.component';

describe('MantenimientoFormComponent', () => {
  let component: MantenimientoFormComponent;
  let fixture: ComponentFixture<MantenimientoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
