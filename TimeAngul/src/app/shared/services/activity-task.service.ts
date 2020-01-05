import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityTaskService {

  constructor(private http:HttpClient) { }

  getTaskList(){
   return this.http.get(environment.apiURL+'/ActivityTask').toPromise();
  }

  getList(){
    console.log(this.http.get(environment.apiURL+'/ActivityStatus'));
   }
}
