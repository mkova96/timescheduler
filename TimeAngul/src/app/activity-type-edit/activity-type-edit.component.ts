import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { mockActivityType } from "../mock/mock";
import { ActivityType, ActivityTypeForm } from "../shared/models/activity-type";
import { Activity } from "../shared/models/activity.model";

@Component({
  selector: "app-activity-type-edit",
  templateUrl: "./activity-type-edit.component.html",
  styleUrls: ["./activity-type-edit.component.css"]
})
export class ActivityTypeEditComponent implements OnInit {
  private activityType: ActivityType;
  private activityTypeForm: ActivityTypeForm;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.activityTypeId = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.service.getHero(params.get("id")))
    // );
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => params.get("id")))
      .subscribe(id => {
        this.activityType = mockActivityType();
        this.activityTypeForm = {
          ActivityTypeName: this.activityType.ActivityTypeName
        };
        this.activityTypeForm.ActivityTypeId = parseInt(id, 10);
      });
  }

  submitForm() {
    console.log("Pošalji na api", this.activityTypeForm);
  }
}
