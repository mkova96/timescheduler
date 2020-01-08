import { Component, OnInit } from "@angular/core";
import { UserActivityType } from "../shared/models/user-activity-type";
import { UserService } from "../shared/services/user.service";
import { AuthService } from "../shared/services/auth.service";
import { mockActivityType, mockUser } from "../mock/mock";

@Component({
  selector: "app-activity-types",
  templateUrl: "./activity-types.component.html",
  styleUrls: []
})
export class ActivityTypesComponent implements OnInit {
  userActivityTypes: UserActivityType[] = [
    {
      ActivityType: mockActivityType(),
      ActivityTypeId: 1,
      TimeFrom: 5,
      TimeTo: 10,
      UserActivityTypeId: 1,
      UserId: 1,
      User: mockUser(),
    }
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log("id korisnika jee:" + this.authService.getUserId());
    this.getUserActivityTypes(this.authService.getUserId());
  }

  getUserActivityTypes(id) {
    console.log("pozivam s ovim idom" + id);
    // this.userActivityTypes = [];
    // this.userActivityTypes = this.userService.getUserActivityTypes(id);

    console.log("velicina tipova jeee: " + this.userActivityTypes.length);
  }
}
