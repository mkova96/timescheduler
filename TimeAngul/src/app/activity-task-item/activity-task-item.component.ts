import { Component, OnInit, Input } from "@angular/core";
import {
  ActivityTask,
  ActivityTaskForm,
  TaskType
} from "../shared/models/activity-task.model";

@Component({
  selector: "app-activity-task-item",
  templateUrl: "./activity-task-item.component.html",
  styleUrls: ["./activity-task-item.component.css"]
})
export class ActivityTaskItemComponent implements OnInit {
  @Input() activityTask: ActivityTask;
  private activityTaskForm: ActivityTaskForm;
  private editing: boolean = false;

  constructor() {}

  ngOnInit() {}

  edit() {
    this.activityTaskForm = {
      ActivityTaskName: this.activityTask.ActivityTaskName
    };
    this.editing = true;
  }
  save() {
    console.log("Send to api", this.activityTask);
    // Mock edit
    this.activityTask.ActivityTaskName = this.activityTaskForm.ActivityTaskName;
    this.editing = false;
  }
  cancelEditing() {
    this.editing = false;
  }

  deleteActivityTask() {
    console.log("Send to api to delete", this.activityTask);
  }
}
