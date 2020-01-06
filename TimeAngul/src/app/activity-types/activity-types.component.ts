import { Component, OnInit } from '@angular/core';
import { UserActivityType } from '../shared/models/user-activity-type';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-activity-types',
  templateUrl: './activity-types.component.html',
  styleUrls: []
})
export class ActivityTypesComponent implements OnInit {
  userActivityTypes:UserActivityType[]=[];


  constructor(private userService:UserService,private authService:AuthService) { }

  ngOnInit() {
    console.log("id korisnika jee:"+this.authService.decodedToken.nameid);
    this.getUserActivityTypes(this.authService.decodedToken.nameid);
  }

  getUserActivityTypes(id){
    console.log("pozivam s ovim idom"+id);
    this.userActivityTypes=[];
    this.userActivityTypes=this.userService.getUserActivityTypes(id);

    


    console.log("velicina tipova jeee: "+this.userActivityTypes.length);
  }

}
