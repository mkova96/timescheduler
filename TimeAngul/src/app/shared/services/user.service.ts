import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Activity } from '../models/activity.model';
import { ActivityTask } from '../models/activity-task.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiURL;
  activities:Activity[] = [];
  activity:Activity;
  activitytask:ActivityTask[]=[];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/user', httpOptions);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/user/' + id, httpOptions);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + '/user/' + id, user);
  }

  getUserActivities(id) {
    console.log("dobio sam:"+id);
    this.http.get<Activity[]>(this.baseUrl + '/user/' + id+'/activity', httpOptions).subscribe(activity => this.activities = activity);
    
    
    this.activities.forEach(element => {
      console.log(element.ActivityTask);
    });

    return this.activities;
  }


  getTasksByDate(id,date) {
    console.log("napocetku imam ovoliko zadataka"+this.activitytask.length);
    console.log("dobio sam:"+id+",a datum"+date);
    this.http.get<ActivityTask[]>(this.baseUrl + '/user/' + id+'/task/'+date, httpOptions).subscribe(a => this.activitytask = a);
   
    console.log(this.activitytask.length);
    
    this.activitytask.forEach(element => {
      console.log(element.ActivityTaskName);
    });

    return this.activitytask;

  }

  getUserActivity(id1,id2) {
    this.http.get<Activity>(this.baseUrl + '/user/' + id1+'/activity/'+id2, httpOptions).subscribe(activity => this.activity = activity);
    console.log(this.activity.ActivityName);
    return this.activity;

  }
}
