import { Component, OnInit, Input } from "@angular/core";
import { ActivityTypeForm } from "../shared/models/activity-type";

@Component({
  selector: "app-activity-type-form",
  templateUrl: "./activity-type-form.component.html",
  styleUrls: ["./activity-type-form.component.css"]
})
export class ActivityTypeFormComponent implements OnInit {
  @Input() activityType: ActivityTypeForm;
  constructor() {}

  ngOnInit() {}
}
