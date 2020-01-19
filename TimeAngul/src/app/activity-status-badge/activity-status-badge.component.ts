import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-activity-status-badge",
  templateUrl: "./activity-status-badge.component.html",
  styleUrls: ["./activity-status-badge.component.css"]
})
export class ActivityStatusBadgeComponent implements OnInit {
  @Input() status: string;

  constructor() {}

  ngOnInit() {}

  get badgeClass() {
    if (this.status === "Done") return "badge-success";
    if (this.status === "Not done") return "badge-warning";
    return "badge-secondary";
  }
}
