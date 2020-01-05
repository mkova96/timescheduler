import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.model';
import { ActivityTask } from '../models/activity-task.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  formData:Activity;
  activityTasks:ActivityTask[];

  constructor() { }
}
