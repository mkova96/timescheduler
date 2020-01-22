import { Component, OnInit, Input } from "@angular/core";
import { ActivityForm } from "../shared/models/activity.model";
import { ActivityColor } from "../shared/models/activity-color.model";
import { mockColorList, mockActivityTypeList } from "../mock/mock";
import { ActivityType } from "../shared/models/activity-type";
import { ActivityColorService } from "../shared/services/activity-color.service";
import { ActivityTypeService } from "../shared/services/activity-type.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-activity-form",
  templateUrl: "./activity-form.component.html",
  styleUrls: ["./activity-form.component.css"]
})
export class ActivityFormComponent implements OnInit {
  @Input() activity: ActivityForm;

  private activityColors: ActivityColor[];
  private activityTypes: ActivityType[];

  constructor(
    private activityColorService: ActivityColorService,
    private activityTypeService: ActivityTypeService
  ) {}

  ngOnInit() {
    console.log("here")
    forkJoin([
      this.activityColorService.all(),
      this.activityTypeService.all()
    ]).subscribe(([activityColors, activityTypes]) => {
      this.activityColors = activityColors;
      this.activityTypes = activityTypes;
    });
  }
}
