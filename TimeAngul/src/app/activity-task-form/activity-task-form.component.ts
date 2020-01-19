import { Component, OnInit, Input } from "@angular/core";
import { ActivityTaskForm } from "../shared/models/activity-task.model";

@Component({
  selector: "app-activity-task-form",
  templateUrl: "./activity-task-form.component.html",
  styleUrls: ["./activity-task-form.component.css"]
})
export class ActivityTaskFormComponent implements OnInit {
  @Input() activityTask: ActivityTaskForm;
  @Input() edit: boolean;
  constructor() {}

  ngOnInit() {}
}
