import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { appRoutes } from "./routes";
import { AuthGuard } from "./_guards/auth.guard";
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatFormFieldControl,
  MatInputModule
} from "@angular/material";

import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { BsDropdownModule, TabsModule } from "ngx-bootstrap";

import { UserEditResolver } from "./_resolvers/user-edit.resolver";

import { AppComponent } from "./app.component";

import { ActivityColorService } from "./shared/services/activity-color.service";
import { ActivitiesComponent } from "./activities/activities.component";
import { ActivityService } from "./shared/services/activity.service";

import { NavComponent } from "./nav/nav.component";
import { AuthService } from "./shared/services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { RouterModule } from "@angular/router";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { ActivityTypesComponent } from "./activity-types/activity-types.component";
import { StatisticComponent } from "./statistic/statistic.component";
import { ActivityComponent } from "./activity/activity.component";
import { ActivityTaskComponent } from "./activity-task/activity-task.component";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityEditComponent } from "./activity-edit/activity-edit.component";
import { ActivityTypeComponent } from "./activity-type/activity-type.component";
import { ActivityTypeAddComponent } from "./activity-type-add/activity-type-add.component";
import { ActivityTypeEditComponent } from "./activity-type-edit/activity-type-edit.component";
import { ActivityTaskItemComponent } from './activity-task-item/activity-task-item.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { ExtendDatePipe } from './_pipes/extendedDate.pipe';
import { ActivityStatusBadgeComponent } from './activity-status-badge/activity-status-badge.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { DataBadgeComponent } from './data-badge/data-badge.component';
import { ActivityTypeFormComponent } from './activity-type-form/activity-type-form.component';
import { ActivityTaskFormComponent } from './activity-task-form/activity-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    UserEditComponent,
    ActivityTypesComponent,
    StatisticComponent,
    ActivityComponent,
    ActivityTaskComponent,
    ActivityAddComponent,
    ActivityEditComponent,
    ActivityTypeComponent,
    ActivityTypeAddComponent,
    ActivityTypeEditComponent,
    ActivityTaskItemComponent,
    FilterPipe,
    ExtendDatePipe,
    ActivityStatusBadgeComponent,
    ActivityFormComponent,
    DataBadgeComponent,
    ActivityTypeFormComponent,
    ActivityTaskFormComponent
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
  entryComponents: [],
  providers: [
    ActivityColorService,
    ActivityService,
    AuthService,
    AuthGuard,
    UserEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
