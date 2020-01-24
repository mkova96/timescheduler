import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { Activity, ActivityForm } from "../models/activity.model";

@Injectable({
  providedIn: "root"
})
export class ActivityService {
  baseUrl = environment.apiURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get userId() {
    return this.authService.getUserId();
  }

  all() {
    return this.http.get<Activity[]>(
      `${this.baseUrl}/user/${this.userId}/Activity`
    );
  }

  get(id: number | string) {
    return this.http.get<Activity>(
      `${this.baseUrl}/user/${this.userId}/Activity/${id}`
    );
  }

  create(ActivityForm: ActivityForm) {
    console.log("ovo saljem",ActivityForm);
    ActivityForm.ActivityColorId=Number(ActivityForm.ActivityColorId);
    ActivityForm.ActivityTypeId=Number(ActivityForm.ActivityTypeId);

    return this.http.post(
      `${this.baseUrl}/user/${this.userId}/Activity`,
      ActivityForm
    );
  }

  update(ActivityForm: ActivityForm) {
    console.log("ovo saljem",ActivityForm);
    return this.http.put(
      `${this.baseUrl}/user/${this.userId}/Activity/${ActivityForm.ActivityId}`,
      ActivityForm
    );
  }

  delete(id: number | string) {
    return this.http.delete(
      `${this.baseUrl}/user/${this.userId}/Activity/${id}`
    );
  }
}
