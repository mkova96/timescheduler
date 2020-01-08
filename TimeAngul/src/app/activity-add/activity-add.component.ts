import { Component, OnInit } from "@angular/core";
import { ActivityColor } from "../shared/models/activity-color.model";
import { ActivityStatus } from "../shared/models/activity-status.model";

interface ActivityForm {
  ActivityName: string;
  ActivityColorId: number;
  ActivityStatusId: number;
}

@Component({
  selector: "app-activity-add",
  templateUrl: "./activity-add.component.html",
  styleUrls: ["./activity-add.component.css"]
})
export class ActivityAddComponent implements OnInit {
  activityColors: ActivityColor[] = [
    { ActivityColorId: 1, ActivityColorName: "Black" },
    { ActivityColorId: 2, ActivityColorName: "Red" }
  ];
  activityStatuses: ActivityStatus[] = [
    { ActivityStatusId: 1, ActivityStatusName: "Done" },
    { ActivityStatusId: 2, ActivityStatusName: "Not done" }
  ];
  activity: ActivityForm;

  constructor() {}

  ngOnInit() {
    this.activity = {
      ActivityName: "",
      ActivityColorId: this.activityColors[0].ActivityColorId,
      ActivityStatusId: this.activityStatuses[0].ActivityStatusId
    };
  }

  submitForm() {
    console.log("Pošalji na api", this.activity);
  }
}
