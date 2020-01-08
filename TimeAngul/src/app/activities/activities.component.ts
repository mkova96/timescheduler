import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { User } from "../shared/models/user";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../shared/services/user.service";
import { AuthService } from "../shared/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Activity } from "../shared/models/activity.model";
import { ActivityTask } from "../shared/models/activity-task.model";
import { mockActivity, mockActivityTask } from "../mock/mock";

const activity1: Activity = mockActivity();
const activityTask1: ActivityTask = mockActivityTask();

activity1.ActivityTask = [activityTask1];

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styles: []
})
export class ActivitiesComponent implements OnInit {
  activity: Activity[] = [activity1];

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    /*console.log("id je:"+this.authService.decodedToken.nameid);
      this.userService.getUserActivity(this.authService.decodedToken.nameid);
      
      this.activity=this.userService.getUserActivity(this.authService.decodedToken.nameid);
      console.log(this.activity.length);*/
  }
}
