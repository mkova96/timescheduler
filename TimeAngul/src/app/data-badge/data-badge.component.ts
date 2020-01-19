import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-data-badge",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./data-badge.component.html",
  styleUrls: ["./data-badge.component.css"]
})
export class DataBadgeComponent implements OnInit {
  @Input() label: string;
  @Input() value: any;
  constructor() {}

  ngOnInit() {}
}
