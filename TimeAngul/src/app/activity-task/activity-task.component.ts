import { Component, OnInit, Input } from "@angular/core";
import { ActivityTask } from "../shared/models/activity-task.model";

@Component({
  selector: "app-activity-task",
  templateUrl: "./activity-task.component.html",
  styleUrls: ["./activity-task.component.css"]
})
export class ActivityTaskComponent implements OnInit {
  detailsShown: boolean = false;
  changing: boolean = false;
  @Input() activityTask: ActivityTask;

  constructor() {}

  ngOnInit() {}

  toggleDetails() {
    this.detailsShown = !this.detailsShown;
  }

  get color() {
    return this.activityTask.Activity.ActivityColor.ActivityColorName;
  }

  toggleChange() {
    this.changing = !this.changing;
  }
}
