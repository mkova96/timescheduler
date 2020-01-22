import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserActivityType } from "../shared/models/user-activity-type";
import { ActivityTypeService } from '../shared/services/activity-type.service';

@Component({
  selector: "app-activity-type",
  templateUrl: "./activity-type.component.html",
  styleUrls: ["./activity-type.component.css"]
})
export class ActivityTypeComponent implements OnInit {
  @Input() userActivityType: UserActivityType;
  @Output() deleted = new EventEmitter<void>();

  constructor(private activityTypeService: ActivityTypeService) {}

  ngOnInit() {}

  deleteActivityType() {
    this.activityTypeService.delete(this.userActivityType.ActivityTypeId).subscribe(result => {
      this.deleted.emit();
    })
  }
}
