import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeAddComponent } from './activity-type-add.component';

describe('ActivityTypeAddComponent', () => {
  let component: ActivityTypeAddComponent;
  let fixture: ComponentFixture<ActivityTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
