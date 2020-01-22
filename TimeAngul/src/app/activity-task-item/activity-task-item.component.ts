import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  ActivityTask,
  ActivityTaskForm,
  TaskType
} from "../shared/models/activity-task.model";
import { ActivityTaskService } from '../shared/services/activity-task.service';

@Component({
  selector: "app-activity-task-item",
  templateUrl: "./activity-task-item.component.html",
  styleUrls: ["./activity-task-item.component.css"]
})
export class ActivityTaskItemComponent implements OnInit {
  @Input() activityTask: ActivityTask;
  @Output() deleted = new EventEmitter<void>();

  private activityTaskForm: ActivityTaskForm;
  private editing: boolean = false;

  constructor(private activityTaskService: ActivityTaskService) {}

  ngOnInit() {}

  edit() {
    this.activityTaskForm = {
      ActivityTaskId: this.activityTask.ActivityTaskId,
      ActivityTaskName: this.activityTask.ActivityTaskName
    };
    this.editing = true;
  }
  save() {
    this.activityTaskService.update(this.activityTask).subscribe(result => {
      this.activityTaskForm.ActivityTaskName = result.ActivityTaskName;
      this.editing = false;
    });
  }
  cancelEditing() {
    this.editing = false;
  }

  deleteActivityTask() {
    this.activityTaskService.delete(this.activityTask.ActivityTaskId).subscribe(result => {
      this.deleted.emit();
    });
  }
}
