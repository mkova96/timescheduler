import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { UserActivityType } from '../models/user-activity-type';
import { ActivityTypeForm } from '../models/activity-type';

@Injectable({
  providedIn: "root"
})
export class UserActivityTypeService {
  baseUrl = environment.apiURL;
  userId: number;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  all() {
    return this.http.get<UserActivityType[]>(`${this.baseUrl}/user/${this.userId}/UserActivityType`);
  }

  get(id: number|string) {
    return this.http.get<UserActivityType>(`${this.baseUrl}/user/${this.userId}/UserActivityType/${id}`);
  }
}
