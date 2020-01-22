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
import { ActivityService } from "../shared/services/activity.service";

const activity1: Activity = mockActivity();
const activityTask1: ActivityTask = mockActivityTask();

activity1.ActivityTask = [activityTask1];

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styles: []
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.activityService.all().subscribe(activities => {
      this.activities = activities;
    });
  }

  onDeleted() {
    this.load();
  }
}
