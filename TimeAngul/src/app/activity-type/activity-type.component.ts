import { Component, OnInit, Input } from "@angular/core";
import { UserActivityType } from "../shared/models/user-activity-type";

@Component({
  selector: "app-activity-type",
  templateUrl: "./activity-type.component.html",
  styleUrls: ["./activity-type.component.css"]
})
export class ActivityTypeComponent implements OnInit {
  @Input() userActivityType: UserActivityType;

  constructor() {}

  ngOnInit() {}

  deleteActivityType() {
    console.log("Call api to delete");
  }
}
