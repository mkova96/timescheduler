import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import {MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatFormFieldControl, MatInputModule} from '@angular/material';



 
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';

import {UserEditResolver} from './_resolvers/user-edit.resolver';

import { AppComponent } from './app.component';

import { ActivityColorsComponent } from './activity-colors/activity-colors.component';
import { ActivityColorComponent } from './activity-colors/activity-color/activity-color.component';
import { ActivityColorListComponent } from './activity-colors/activity-color-list/activity-color-list.component';
import { ActivityColorService } from './shared/services/activity-color.service';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityComponent } from './activities/activity/activity.component';
import { ActivityTasksComponent } from './activities/activity-tasks/activity-tasks.component';
import { ActivityService } from './shared/services/activity.service';

import { NavComponent } from './nav/nav.component';
import { AuthService } from './shared/services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ActivityColorsComponent,
    ActivityColorComponent,
    ActivityColorListComponent,
    ActivitiesComponent,
    ActivityComponent,
    ActivityTasksComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),  
    ToastrModule.forRoot(),
    MatDialogModule,
    TabsModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents:[ActivityTasksComponent],
  providers: [ ActivityColorService,ActivityService,AuthService,AuthGuard,UserEditResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
