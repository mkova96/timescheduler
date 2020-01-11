import { Component, OnInit, Input } from "@angular/core";
import { ActivityTask } from "../shared/models/activity-task.model";

@Component({
  selector: "app-activity-task-item",
  templateUrl: "./activity-task-item.component.html",
  styleUrls: ["./activity-task-item.component.css"]
})
export class ActivityTaskItemComponent implements OnInit {
  @Input() activityTask: ActivityTask;

  constructor() {}

  ngOnInit() {}

  deleteActivityTask() {
    console.log("Send to api to delete", this.activityTask);
  }
}
