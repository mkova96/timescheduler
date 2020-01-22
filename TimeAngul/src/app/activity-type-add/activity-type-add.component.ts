import { Component, OnInit } from "@angular/core";
import { ActivityType, ActivityTypeForm } from "../shared/models/activity-type";
import { ActivityTypeService } from "../shared/services/activity-type.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-activity-type-add",
  templateUrl: "./activity-type-add.component.html",
  styleUrls: ["./activity-type-add.component.css"]
})
export class ActivityTypeAddComponent implements OnInit {
  activityType: ActivityTypeForm;

  constructor(
    private activityTypeService: ActivityTypeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activityType = {
      ActivityTypeName: "",
      TimeFrom: 0,
      TimeTo: 24
    };
  }

  submitForm() {
    this.activityTypeService.create(this.activityType).subscribe(result => {
      this.router.navigate(['/activityTypes']);
    });
  }
}
