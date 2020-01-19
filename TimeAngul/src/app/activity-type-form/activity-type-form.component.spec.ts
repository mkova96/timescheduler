import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeFormComponent } from './activity-type-form.component';

describe('ActivityTypeFormComponent', () => {
  let component: ActivityTypeFormComponent;
  let fixture: ComponentFixture<ActivityTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
