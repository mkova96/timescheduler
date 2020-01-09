import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeEditComponent } from './activity-type-edit.component';

describe('ActivityTypeEditComponent', () => {
  let component: ActivityTypeEditComponent;
  let fixture: ComponentFixture<ActivityTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
