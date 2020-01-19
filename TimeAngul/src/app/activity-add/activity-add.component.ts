import { Component, OnInit } from "@angular/core";
import { ActivityColor } from "../shared/models/activity-color.model";
import { ActivityStatus } from "../shared/models/activity-status.model";
import { ActivityForm } from '../shared/models/activity.model';
import { ActivityType } from '../shared/models/activity-type';
import { mockActivityTypeList, mockColorList } from '../mock/mock';

@Component({
  selector: "app-activity-add",
  templateUrl: "./activity-add.component.html",
  styleUrls: ["./activity-add.component.css"]
})
export class ActivityAddComponent implements OnInit {
  private activityColors: ActivityColor[] = mockColorList();
  private activityTypes: ActivityType[] = mockActivityTypeList();
  private activity: ActivityForm;

  constructor() {}

  ngOnInit() {
    this.activity = {
      ActivityName: "",
      ActivityColorId: this.activityColors[0].ActivityColorId,
      DeadLine: new Date(),
      ActivityTypeId: this.activityTypes[0].ActivityTypeId
    };
  }

  submitForm() {
    console.log("Pošalji na api", this.activity);
  }
}
