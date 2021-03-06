import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { ActivityColor } from '../models/activity-color.model';

@Injectable({
  providedIn: "root"
})
export class ActivityColorService {
  baseUrl = environment.apiURL;
  userId: number;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  all() {
    return this.http.get<ActivityColor[]>(
      `${this.baseUrl}/ActivityColor`
    );
  }
}
