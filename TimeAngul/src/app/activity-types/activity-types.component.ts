import { Component, OnInit } from "@angular/core";
import { UserActivityType } from "../shared/models/user-activity-type";
import { UserService } from "../shared/services/user.service";
import { AuthService } from "../shared/services/auth.service";
import { mockActivityType, mockUser } from "../mock/mock";
import { ActivityTypeService } from "../shared/services/activity-type.service";
import { UserActivityTypeService } from "../shared/services/user-activity-type.service";

@Component({
  selector: "app-activity-types",
  templateUrl: "./activity-types.component.html",
  styleUrls: []
})
export class ActivityTypesComponent implements OnInit {
  userActivityTypes: UserActivityType[] = [];

  constructor(private userActivityTypeService: UserActivityTypeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.userActivityTypeService.all().subscribe(userActivityTypes => {
      this.userActivityTypes = userActivityTypes;
    });
  }

  onDeleted() {
    this.load();
  }
}
