import { Component, OnInit, Input } from "@angular/core";
import { ActivityTask } from "../shared/models/activity-task.model";

enum WorkedOnTask {
  YES = "yes",
  NO = "no"
}

interface ActivityTaskForm {
  workedOnTask: WorkedOnTask;
  timeFrom?: number;
  timeTo?: number;
}

@Component({
  selector: "app-activity-task",
  templateUrl: "./activity-task.component.html",
  styleUrls: ["./activity-task.component.css"]
})
export class ActivityTaskComponent implements OnInit {
  @Input() activityTask: ActivityTask;

  private activityTaskForm: ActivityTaskForm;
  detailsShown: boolean = false;
  changing: boolean = false;

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
    this.activityTaskForm = {
      workedOnTask: WorkedOnTask.YES
    };
  }

  submitForm() {
    console.log("Pošalji na api", this.activityTaskForm);
  }
}
