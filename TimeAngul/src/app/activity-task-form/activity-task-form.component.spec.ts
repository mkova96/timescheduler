import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTaskFormComponent } from './activity-task-form.component';

describe('ActivityTaskFormComponent', () => {
  let component: ActivityTaskFormComponent;
  let fixture: ComponentFixture<ActivityTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
