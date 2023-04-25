import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashClientesComponent } from './dash-clientes.component';

describe('DashClientesComponent', () => {
  let component: DashClientesComponent;
  let fixture: ComponentFixture<DashClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
