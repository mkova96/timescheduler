import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:49947/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  userId:number=0;

  constructor(private http: HttpClient) {}

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.userId=this.decodedToken.nameid;
          console.log(this.decodedToken);
          console.log(this.decodedToken.nameid);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
