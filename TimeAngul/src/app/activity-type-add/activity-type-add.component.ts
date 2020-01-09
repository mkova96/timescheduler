import { Component, OnInit } from "@angular/core";
import { ActivityType } from "../shared/models/activity-type";

interface ActivityTypeForm {
  ActivityTypeName: string;
}

@Component({
  selector: "app-activity-type-add",
  templateUrl: "./activity-type-add.component.html",
  styleUrls: ["./activity-type-add.component.css"]
})
export class ActivityTypeAddComponent implements OnInit {
  activityType: ActivityTypeForm;

  constructor() {}

  ngOnInit() {
    this.activityType = {
      ActivityTypeName: ""
    };
  }

  submitForm() {
    console.log("Pošalji na api", this.activityType);
  }
}
