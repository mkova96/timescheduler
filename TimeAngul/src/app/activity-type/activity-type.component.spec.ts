import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeComponent } from './activity-type.component';

describe('ActivityTypeComponent', () => {
  let component: ActivityTypeComponent;
  let fixture: ComponentFixture<ActivityTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
