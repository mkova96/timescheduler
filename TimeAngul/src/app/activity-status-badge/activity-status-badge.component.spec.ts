import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStatusBadgeComponent } from './activity-status-badge.component';

describe('ActivityStatusBadgeComponent', () => {
  let component: ActivityStatusBadgeComponent;
  let fixture: ComponentFixture<ActivityStatusBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityStatusBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
