import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { NgForm } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ActivityTasksComponent } from '../activity-tasks/activity-tasks.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styles: []
})
export class ActivityComponent implements OnInit {

  constructor(private service: ActivityService,private dialog: MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      ActivityId: null,
      ActivityStatusId: 0,
      ActivityName: '',
      UserId:0, //pripazi
      ActivityTask:[]
    };
    this.service.activityTasks = [];
  }

  AddOrEditActivityTask(activityTaskIndex, ActivityId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { activityTaskIndex, ActivityId };
    this.dialog.open(ActivityTasksComponent, dialogConfig);
  }

}
