import { Component, OnInit } from "@angular/core";
import {
  ActivityTask,
  ActivityTaskForm,
  TaskType
} from "../shared/models/activity-task.model";
import {
  mockActivityTask,
  mockActivity,
  mockActivityTypeList,
  mockColorList
} from "../mock/mock";
import { MatDatepickerInputEvent } from "@angular/material";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { ActivityForm } from "../shared/models/activity.model";
import { ActivityColor } from "../shared/models/activity-color.model";
import { ActivityType } from "../shared/models/activity-type";

interface ActivityEditForm extends ActivityForm {
  activityTasks: ActivityTask[];
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
  // private activityColors: ActivityColor[] = mockColorList();
  // private activityTypes: ActivityType[] = mockActivityTypeList();
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
          ActivityColorId: mockActivity_.ActivityColor.ActivityColorId,
          DeadLine: new Date(),
          ActivityTypeId: mockActivity_.ActivityType.ActivityTypeId,
          activityTasks: [
            mockActivityTask(),
            mockActivityTask(),
            mockActivityTask()
          ]
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

  submitForm() {
    console.log("Pošalji na api", this.activity);
  }
}
