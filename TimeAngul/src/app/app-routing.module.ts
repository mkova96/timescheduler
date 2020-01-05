import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityComponent } from './activities/activity/activity.component';

const routes: Routes = [
  {path:'',redirectTo:'activity',pathMatch:'full'},
  {path:'activities',component:ActivitiesComponent},
  {path:'activity',children:[
    {path:'',component:ActivityComponent},  
    {path:'edit/:id',component:ActivityComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
