import { Component, OnInit } from "@angular/core";
import { ActivityType, ActivityTypeForm } from "../shared/models/activity-type";

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
      ActivityTypeName: "",
      TimeFrom: 0,
      TimeTo: 24
    };
  }

  submitForm() {
    console.log("Pošalji na api", this.activityType);
  }
}
