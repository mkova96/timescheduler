import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivityTask, WorkedOnTask, ActivityTaskWorkedOnForm } from "../shared/models/activity-task.model";
import { ActivityTaskService } from "../shared/services/activity-task.service";

@Component({
  selector: "app-activity-task",
  templateUrl: "./activity-task.component.html",
  styleUrls: ["./activity-task.component.css"]
})
export class ActivityTaskComponent implements OnInit {
  @Input() activityTask: ActivityTask;
  @Output() updated = new EventEmitter<void>();

  private activityTaskForm: ActivityTaskWorkedOnForm;
  detailsShown: boolean = false;
  changing: boolean = false;
  date;

  constructor(private activityTaskService: ActivityTaskService) {}

  ngOnInit() {
    this.date=(new Date());
  }

  toggleDetails() {
    this.detailsShown = !this.detailsShown;
  }

  get color() {
    return this.activityTask.Activity.ActivityColor.ActivityColorName;
  }

  toggleChange() {
    this.changing = !this.changing;
    this.activityTaskForm = {
      ActivityTaskId: this.activityTask.ActivityTaskId,
      workedOnTask: WorkedOnTask.YES,
      timeFrom: 0,
      timeTo: 24
    };
  }

  submitForm() {
    this.activityTaskService
      .updateWork(this.activityTaskForm)
      .subscribe(result => {
        this.updated.emit()
      });
  }
}
