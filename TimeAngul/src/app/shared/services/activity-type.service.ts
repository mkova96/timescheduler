import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { ActivityTypeForm, ActivityType } from "../models/activity-type";

@Injectable({
  providedIn: "root"
})
export class ActivityTypeService {
  baseUrl = environment.apiURL;
  userId: number;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  all() {
    return this.http.get<ActivityType[]>(
      `${this.baseUrl}/user/${this.userId}/ActivityType`
    );
  }

  get(id: number | string) {
    return this.http.get<ActivityType>(
      `${this.baseUrl}/user/${this.userId}/ActivityType/${id}`
    );
  }

  create(activityTypeForm: ActivityTypeForm) {
    return this.http.post(
      `${this.baseUrl}/user/${this.userId}/ActivityType`,
      activityTypeForm
    );
  }

  update(activityTypeForm: ActivityTypeForm) {
    return this.http.put(
      `${this.baseUrl}/user/${this.userId}/ActivityType/${activityTypeForm.ActivityTypeId}`,
      activityTypeForm
    );
  }

  delete(id: number | string) {
    return this.http.delete(
      `${this.baseUrl}/user/${this.userId}/ActivityType/${id}`
    );
  }
}
