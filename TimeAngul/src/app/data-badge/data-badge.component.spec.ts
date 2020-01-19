import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBadgeComponent } from './data-badge.component';

describe('DataBadgeComponent', () => {
  let component: DataBadgeComponent;
  let fixture: ComponentFixture<DataBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
