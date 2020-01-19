import { Component, OnInit, Input } from "@angular/core";
import { Activity } from "../shared/models/activity.model";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.css"]
})
export class ActivityComponent implements OnInit {
  showingTasks: boolean = false;

  @Input() activity: Activity;
  @Input() showTasks: boolean;

  constructor() {}

  ngOnInit() {}

  toggleShowingTasks() {
    this.showingTasks = !this.showingTasks;
  }

  deleteActivity() {
    console.log("Pošalji na api brisanje");
  }

  get color() {
    return this.activity.ActivityColor.ActivityColorName;
  }
}
