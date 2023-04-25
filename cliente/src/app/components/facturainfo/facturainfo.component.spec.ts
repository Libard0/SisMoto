import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturainfoComponent } from './facturainfo.component';

describe('FacturainfoComponent', () => {
  let component: FacturainfoComponent;
  let fixture: ComponentFixture<FacturainfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturainfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
