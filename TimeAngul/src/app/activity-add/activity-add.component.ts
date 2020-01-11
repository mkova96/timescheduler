import { Component, OnInit } from "@angular/core";
import { ActivityColor } from "../shared/models/activity-color.model";
import { ActivityStatus } from "../shared/models/activity-status.model";

interface ActivityForm {
  ActivityName: string;
  ActivityColorId: number;
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
  activity: ActivityForm;

  constructor() {}

  ngOnInit() {
    this.activity = {
      ActivityName: "",
      ActivityColorId: this.activityColors[0].ActivityColorId
    };
  }

  submitForm() {
    console.log("Pošalji na api", this.activity);
  }
}
