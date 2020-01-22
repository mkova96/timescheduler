import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { mockActivityType, mockUserActivityType } from "../mock/mock";
import { ActivityType, ActivityTypeForm } from "../shared/models/activity-type";
import { Activity } from "../shared/models/activity.model";
import { UserActivityType } from "../shared/models/user-activity-type";
import { UserActivityTypeService } from "../shared/services/user-activity-type.service";
import { ActivityTypeService } from "../shared/services/activity-type.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-activity-type-edit",
  templateUrl: "./activity-type-edit.component.html",
  styleUrls: ["./activity-type-edit.component.css"]
})
export class ActivityTypeEditComponent implements OnInit {
  private activityType: ActivityType;
  private userActivityType: UserActivityType;
  private activityTypeForm: ActivityTypeForm;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userActivityTypeService: UserActivityTypeService,
    private activityTypeService: ActivityTypeService
  ) {}

  ngOnInit() {
    // this.activityTypeId = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.service.getHero(params.get("id")))
    // );
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => params.get("id")))
      .subscribe(id => {
        const actiivtyTypeId = parseInt(id, 10);
        forkJoin([
          this.activityTypeService.get(actiivtyTypeId),
          this.userActivityTypeService.get(actiivtyTypeId)
        ]).subscribe(([activityType, userActivityType]) => {
          this.activityType = activityType;
          this.userActivityType = userActivityType;
          this.activityTypeForm = {
            ActivityTypeName: this.activityType.ActivityTypeName,
            TimeFrom: this.userActivityType.TimeFrom,
            TimeTo: this.userActivityType.TimeTo
          };
          this.activityTypeForm.ActivityTypeId = actiivtyTypeId;
        });
      });
  }

  submitForm() {
    this.activityTypeService.update(this.activityTypeForm).subscribe(result => {
      this.router.navigate(["/activityTypes"]);
    });
  }
}
