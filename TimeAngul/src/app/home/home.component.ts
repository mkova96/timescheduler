import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material";
import { UserService } from "../shared/services/user.service";
import { AuthService } from "../shared/services/auth.service";
import { Activity } from "../shared/models/activity.model";
import { ActivityTask } from "../shared/models/activity-task.model";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  activityTask: ActivityTask[];
  environment = environment;

  todaysDate: string;
  selectedDate: string;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.todaysDate = this.getDate(new Date().toDateString());
      this.getTasksByDate(this.todaysDate);
    }
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
    this.activityTask = [];
    this.selectedDate = this.getDate(`${event.value}`);
    this.getTasksByDate(this.selectedDate);
  }

  getTasksByDate(date: string) {
    console.log("pozivam s ovim datumom" + date);
    this.activityTask = [];
    this.activityTask = this.userService.getTasksByDate(
      this.authService.getUserId(),
      date
    );

    this.activityTask.forEach(e => {
      e.Activity = this.userService.getUserActivity(
        this.authService.decodedToken.nameid,
        e.ActivityId
      );
    });

    console.log("velicina zadataka jeee: " + this.activityTask.length);
  }

  getDate(date: string) {
    var f = date.split(" ");
    var ff = f[3].split("");

    return f[2] + "-" + f[1] + "-" + ff[2] + ff[3];
  }
}
