import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInitViewComponent } from './user-init-view.component';

describe('UserInitViewComponent', () => {
  let component: UserInitViewComponent;
  let fixture: ComponentFixture<UserInitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInitViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
