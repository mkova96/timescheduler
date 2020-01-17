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

  statistics=[];
  chachedStatistic=[];
  

  numOfTasks:number=0;
  numOfCompletedTasks:number=0;
  numOfFutureTasks:number=0;

  timeSpend:number=0;
  timeFuture:number=0;
  

  constructor(private authService:AuthService,private userService:UserService) { }

 async  ngOnInit() {
   await  this.getAllUserActivityTypes(this.authService.getUserId());
    //this.getUserActivityTypes(this.authService.decodedToken.nameid);
  }

  async getAllUserActivityTypes(id){ 
    this.userActivityTypes=[];
    this.userActivityTypes=await this.userService.getAllUserActivityTypes(id);

    console.log(JSON.stringify(this.userActivityTypes));

    this.userActivityTypes.forEach(element => {
      console.log(JSON.stringify(element.ActivityType));
      this.activityTypes.push(element.ActivityType);
    });

    console.log(this.activityTypes);

    this.activityTypes.forEach(element => {


      this.numOfTasks=0;
      this.numOfCompletedTasks=0;
      this.numOfFutureTasks=0;

      this.timeSpend=0;
      this.timeFuture=0;

      console.log(element.Activity.length);

      element.Activity.forEach(e => {
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
      this.statistics.push({numOfTasks:this.numOfTasks,
        numOfCompletedTasks:this.numOfCompletedTasks,
        numOfFutureTasks:this.numOfFutureTasks,
        timeSpend:this.timeSpend,
        timeFuture:this.timeFuture,
        statisticName:element.ActivityTypeName});


    });

    console.log("Velicina statistike je: "+this.statistics.length);

    this.statistics.forEach(element => {
      console.log(element);
      this.chachedStatistic.push(element);

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

  filterForeCasts(filterVal: any) {
    if (filterVal == "0")
        this.statistics = this.chachedStatistic;
    else
        this.statistics = this.chachedStatistic.filter((item) => item.statisticName == filterVal);
  }

  
 }




