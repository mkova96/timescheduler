import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material";
import { UserService } from "../shared/services/user.service";
import { AuthService } from "../shared/services/auth.service";
import { Activity } from "../shared/models/activity.model";
import { ActivityTask } from "../shared/models/activity-task.model";
import { mockActivityTask } from "../mock/mock";
import { ActivityTaskService } from "../shared/services/activity-task.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  activityTasks: ActivityTask[] = [];

  todaysDate: string;
  selectedDate: string;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService,
    private activityTaskService: ActivityTaskService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.todaysDate = this.getDate(new Date().toDateString());
      this.selectedDate = this.todaysDate;
      this.load();
    }
  }

  load() {
    this.activityTaskService
      .allByDate(this.selectedDate)
      .subscribe(activityTasks => {
        this.activityTasks = activityTasks;
      });
  }

  onUpdated() {
    this.load();
  }

  registerToggle() {
    this.registerMode = true;
  }

  public onDate(event): void {
    console.log(event);
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.activityTasks = [];
    this.selectedDate = this.getDate(`${event.value}`);
    this.load();
  }

  // getTasksByDate(date: string) {
  //   this.activityTasks = [];
  //   this.activityTasks = this.userService.getTasksByDate(
  //     this.authService.getUserId(),
  //     date
  //   );

  //   this.activityTasks.forEach(e => {
  //     e.Activity = this.userService.getUserActivity(
  //       this.authService.decodedToken.nameid,
  //       e.ActivityId
  //     );
  //   });
  // }

  getDate(date: string) {
    var f = date.split(" ");
    var ff = f[3].split("");

    return f[2] + "-" + f[1] + "-" + ff[2] + ff[3];
  }
}
