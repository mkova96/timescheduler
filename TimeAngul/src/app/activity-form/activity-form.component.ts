import { Component, OnInit, Input } from "@angular/core";
import { ActivityForm } from "../shared/models/activity.model";
import { ActivityColor } from '../shared/models/activity-color.model';
import { mockColorList, mockActivityTypeList } from '../mock/mock';
import { ActivityType } from '../shared/models/activity-type';

@Component({
  selector: "app-activity-form",
  templateUrl: "./activity-form.component.html",
  styleUrls: ["./activity-form.component.css"]
})
export class ActivityFormComponent implements OnInit {
  @Input() activity: ActivityForm;

  private activityColors: ActivityColor[] = mockColorList();
  private activityTypes: ActivityType[] = mockActivityTypeList();

  constructor() {}

  ngOnInit() {}
}
