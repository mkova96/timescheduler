import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { ActivityTask, ActivityTaskForm, ActivityTaskWorkedOnForm } from "../models/activity-task.model";

@Injectable({
  providedIn: "root"
})
export class ActivityTaskService {
  baseUrl = environment.apiURL;
  userId: number;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  all() {
    return this.http.get<ActivityTask[]>(
      `${this.baseUrl}/user/${this.userId}/ActivityTask`
    );
  }

  allByDate(date) {
    return this.http.get<ActivityTask[]>(
      `${this.baseUrl}/ActivityTask/user/${this.userId}/date/${date}`
    );
  }

  updateWork(activityTaskForm: ActivityTaskWorkedOnForm) {
    return this.http.post(
      `${this.baseUrl}/ActivityTask/updateWork/${activityTaskForm.ActivityTaskId}`,
      activityTaskForm
    );
  }

  get(id: number | string) {
    return this.http.get<ActivityTask>(
      `${this.baseUrl}/user/${this.userId}/ActivityTask/${id}`
    );
  }

  create(activityTaskForm: ActivityTaskForm) {
    return this.http.post(
      `${this.baseUrl}/ActivityTask/user/${this.userId}/new`,
      activityTaskForm
    );
  }

  update(activityTaskForm: ActivityTaskForm) {
    return this.http.put<ActivityTask>(
      `${this.baseUrl}/ActivityTask/${activityTaskForm.ActivityTaskId}`,
      activityTaskForm
    );
  }

  delete(id: number | string) {
    return this.http.delete(`${this.baseUrl}/ActivityTask/${id}`);
  }
}
