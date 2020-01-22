import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = `${environment.apiURL}/auth/`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  userId: number = 0;

  constructor(private http: HttpClient) {}

  register(model: any) {
    return this.http.post(this.baseUrl + "register", model);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.userId = this.decodedToken.nameid;
        }
      })
    );
  }

  loggedIn() {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserId(): number | null {
    if (this.userId) {
      return this.userId;
    }

    const token = this.getToken();
    if (!token) {
      return null;
    }
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.userId = this.decodedToken.nameid;
    return this.userId;
  }
}
