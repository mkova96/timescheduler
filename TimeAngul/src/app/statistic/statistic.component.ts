import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { UserActivityType } from '../shared/models/user-activity-type';
import { Activity } from '../shared/models/activity.model';
import { ActivityType } from '../shared/models/activity-type';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: []
})
export class StatisticComponent implements OnInit {

  userActivityType:UserActivityType;
  userActivityTypes:UserActivityType[]=[];
  
  activityTypes:ActivityType[]=[];

  numOfTasks:number=0;
  numOfCompletedTasks:number=0;
  numOfFutureTasks:number=0;

  timeSpend:number=0;
  timeFuture:number=0;
  

  constructor(private authService:AuthService,private userService:UserService) { }

  ngOnInit() {
    this.getAllUserActivityTypes(this.authService.decodedToken.nameid);
    this.getUserActivityTypes(this.authService.decodedToken.nameid);
  }

  getAllUserActivityTypes(id){ 
    this.userActivityTypes=[];
    this.userActivityTypes=this.userService.getAllUserActivityTypes(id);

    this.userActivityTypes.forEach(element => {
      this.activityTypes.push(element.ActivityType);
    });
  }

  getUserActivityTypes(id){

    console.log("pozivam s ovim idom"+id);
    this.userActivityType=this.userService.getUserActivityTypes(id,2); //DODAT PRAVI ID TIPA AKTIVNOSTI

      this.userActivityType.ActivityType.Activity.forEach(e => {
        console.log("Dodajem broj u ukupni broj:"+e.ActivityTask.length);
        this.numOfTasks+=e.ActivityTask.length;
        e.ActivityTask.forEach(z => {
          var donePercentageArray=z.DonePercentage.split("/");
          this.timeSpend+=Number(donePercentageArray[0]);
          this.timeFuture+=Number(donePercentageArray[1])-Number(donePercentageArray[0]);

          if (Number(donePercentageArray[0])===Number(donePercentageArray[1])){
            this.numOfCompletedTasks+=1;
          }else{
            this.numOfFutureTasks+=1;
          }
        });
      });
    console.log("velicina tipova jeee: "+this.userActivityType);
  }

  /*filterForeCasts(filterVal: any) {
    if (filterVal == "0")
        this.forecasts = this.cacheForecasts;
    else
        this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
}*/

}
