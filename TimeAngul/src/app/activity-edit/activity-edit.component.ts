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
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { ActivityForm } from "../shared/models/activity.model";
import { ActivityColor } from "../shared/models/activity-color.model";
import { ActivityType } from "../shared/models/activity-type";
import { ActivityService } from "../shared/services/activity.service";
import { ActivityTaskService } from "../shared/services/activity-task.service";

interface ActivityEditForm extends ActivityForm {
  activityTasks: ActivityTask[];
}

const emptyActivityTask = (activityId): ActivityTaskForm => {
  return {
    ActivityId: activityId,
    ActivityTaskName: "",
    Type: TaskType.Auto,
    Duration: 1,
    FixedDate: new Date(),
    TimeFrom: 0,
    TimeTo: 24
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
  private activityId: number;

  private creating: boolean = false;

  private newActivityTask: ActivityTaskForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private activityTaskService: ActivityTaskService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => params.get("id")))
      .subscribe(id => {
        this.activityId = parseInt(id, 10);
        this.load();
      });
  }

  load(onlyTasks: boolean = false) {
    this.activityService.get(this.activityId).subscribe(activity => {
      if (onlyTasks) {
        this.activity.activityTasks = activity.ActivityTask;
      } else {
        this.activity = {
          ActivityId: activity.ActivityId,
          ActivityName: activity.ActivityName,
          ActivityColorId: activity.ActivityColor.ActivityColorId,
          DeadLine: new Date(activity.DeadLine),
          ActivityTypeId: activity.ActivityType.ActivityTypeId,
          activityTasks: activity.ActivityTask
        };
      }
    });
  }

  addNewActivityTask() {
    this.newActivityTask = emptyActivityTask(this.activityId);
    this.creating = true;
  }

  cancelAddingNewTask() {
    this.creating = false;
  }

  saveNewActivityTask() {
    this.activityTaskService.create(this.newActivityTask).subscribe(result => {
      this.creating = false;
      this.load(true);
    });
  }

  onTaskDeleted() {
    this.load(true);
  }

  setFixedData(type: string, event: MatDatepickerInputEvent<Date>) {
    this.newActivityTask.FixedDate = event.value;
  }

  submitForm() {
    this.activityService.update(this.activity).subscribe(result => {
      this.router.navigate(["/activities"]);
    });
  }
}
