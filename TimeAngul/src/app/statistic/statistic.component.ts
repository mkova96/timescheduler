import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { UserActivityType } from '../shared/models/user-activity-type';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: []
})
export class StatisticComponent implements OnInit {

  userActivityTypes:UserActivityType[]=[];
  numOfTasks:number=0;

  constructor(private authService:AuthService,private userService:UserService) { }

  ngOnInit() {
    console.log("id korisnika jee:"+this.authService.decodedToken.nameid);
    this.getUserActivityTypes(this.authService.decodedToken.nameid);
  }

  getUserActivityTypes(id){
    console.log("pozivam s ovim idom"+id);
    this.userActivityTypes=[];
    this.userActivityTypes=this.userService.getUserActivityTypes(id);

    this.userActivityTypes.forEach(element => {
      element.ActivityType.Activity.forEach(e => {
        console.log("Dodajem broj u ukupni broj:"+e.ActivityTask.length);
        this.numOfTasks+=e.ActivityTask.length;
      });
    });

    


    console.log("velicina tipova jeee: "+this.userActivityTypes.length);
  }

}
