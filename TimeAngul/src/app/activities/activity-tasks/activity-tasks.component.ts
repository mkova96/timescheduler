import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { NgForm } from '@angular/forms';
import { ActivityTask } from 'src/app/shared/models/activity-task.model';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { ActivityTaskService } from 'src/app/shared/services/activity-task.service';

@Component({
  selector: 'app-activity-tasks',
  templateUrl: './activity-tasks.component.html',
  styles: []
})
export class ActivityTasksComponent implements OnInit {

  formData: ActivityTask;
  itemList: ActivityTask[];
  isValid: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ActivityTasksComponent>,
  private activityTaskService: ActivityTaskService,
  private activitySevice: ActivityService) { }

  ngOnInit() {
    //this.activityTaskService.getList();
    if (this.data.activityTaskIndex == null){
      this.formData = {
        ActivityTaskId: null,
        ActivityId: this.data.ActivityId,
        ActivityTaskName:'',
        Activity:null,
        TimeFrom:null
      };
    }
    else{
      this.formData = Object.assign({}, this.activitySevice.activityTasks[this.data.activityTaskIndex]);
    }
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.activityTaskIndex == null){
        this.activitySevice.activityTasks.push(form.value);
        console.log(form.value);
      }
      else
        this.activitySevice.activityTasks[this.data.activityTaskIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: ActivityTask) {
    this.isValid = true;
    if (formData.ActivityTaskId == 0)
      this.isValid = false;
    return this.isValid;
  }

}
