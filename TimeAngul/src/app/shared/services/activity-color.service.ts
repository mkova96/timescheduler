import { Injectable } from '@angular/core';
import { ActivityColor } from '../models/activity-color.model';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ActivityColorService {
  formData:ActivityColor
  readonly rootURL = 'http://localhost:49947/api';
  list : ActivityColor[];

  constructor(private http: HttpClient) { }

  postActivityColor() {
    return this.http.post(this.rootURL + '/ActivityColor', this.formData);
  }
  putActivityColor() {
    return this.http.put(this.rootURL + '/ActivityColor/'+ this.formData.ActivityColorId, this.formData);
  }
  deleteActivityColor(id) {
    return this.http.delete(this.rootURL + '/ActivityColor/'+ id);
  }

  refreshList(){
    this.http.get(this.rootURL + '/ActivityColor')
    .toPromise()
    .then(res => this.list = res as ActivityColor[]);
  }
}
