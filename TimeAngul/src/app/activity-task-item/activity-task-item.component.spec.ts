import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTaskItemComponent } from './activity-task-item.component';

describe('ActivityTaskItemComponent', () => {
  let component: ActivityTaskItemComponent;
  let fixture: ComponentFixture<ActivityTaskItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTaskItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
