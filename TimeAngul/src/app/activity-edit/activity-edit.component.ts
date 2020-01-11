import { Component, OnInit } from "@angular/core";
import { ActivityTask } from "../shared/models/activity-task.model";
import { mockActivityTask, mockActivity } from "../mock/mock";
import { MatDatepickerInputEvent } from "@angular/material";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

interface ActivityEditForm {
  ActivityName: string;
  activityTasks: ActivityTask[];
}

enum TaskType {
  Fixed = "fixed",
  Auto = "auto"
}

interface ActivityTaskForm {
  ActivityTaskName: string;
  Type: TaskType;
  TimeFrom?: number;
  TimeTo?: number;
  Duration: number;
  FixedDate: Date;
}

const emptyActivityTask = (): ActivityTaskForm => {
  return {
    ActivityTaskName: "",
    Type: TaskType.Auto,
    Duration: 0,
    FixedDate: new Date()
  };
};

@Component({
  selector: "app-activity-edit",
  templateUrl: "./activity-edit.component.html",
  styleUrls: ["./activity-edit.component.css"]
})
export class ActivityEditComponent implements OnInit {
  private activity: ActivityEditForm;

  private creating: boolean = false;

  private newActivityTask: ActivityTaskForm;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => params.get("id")))
      .subscribe(id => {
        const mockActivity_ = mockActivity();
        this.activity = {
          ActivityName: mockActivity_.ActivityName,
          activityTasks: [mockActivityTask()]
        };
      });
  }

  addNewActivityTask() {
    this.newActivityTask = emptyActivityTask();
    this.creating = true;
  }

  cancelAddingNewTask() {
    this.creating = false;
  }

  saveNewActivityTask() {
    console.log("Send to api", this.newActivityTask);
    this.creating = false;
  }

  setFixedData(type: string, event: MatDatepickerInputEvent<Date>) {
    this.newActivityTask.FixedDate = event.value;
  }
}
