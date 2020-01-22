import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Activity } from "../shared/models/activity.model";
import { ActivityService } from "../shared/services/activity.service";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.css"]
})
export class ActivityComponent implements OnInit {
  showingTasks: boolean = false;

  @Input() activity: Activity;
  @Input() showTasks: boolean;
  @Output() deleted = new EventEmitter<void>();

  constructor(private activityService: ActivityService) {}

  ngOnInit() {}

  toggleShowingTasks() {
    this.showingTasks = !this.showingTasks;
  }

  deleteActivity() {
    this.activityService.delete(this.activity.ActivityId).subscribe(result => {
      this.deleted.emit();
    });
  }

  get color() {
    return this.activity.ActivityColor.ActivityColorName;
  }
}
