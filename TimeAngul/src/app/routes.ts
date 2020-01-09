import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./_guards/auth.guard";
import { ActivitiesComponent } from "./activities/activities.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserEditResolver } from "./_resolvers/user-edit.resolver";
import { UserActivityResolver } from "./_resolvers/user-activity.resolver";
import { ActivityTypesComponent } from "./activity-types/activity-types.component";
import { Component } from "@angular/core";
import { StatisticComponent } from "./statistic/statistic.component";
import { ActivityAddComponent } from "./activity-add/activity-add.component";
import { ActivityTypeEditComponent } from "./activity-type-edit/activity-type-edit.component";
import { ActivityTypeAddComponent } from "./activity-type-add/activity-type-add.component";
import { ActivityEditComponent } from "./activity-edit/activity-edit.component";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "activities", component: ActivitiesComponent },
      { path: "activities/add", component: ActivityAddComponent },
      { path: "activities/:id", component: ActivityEditComponent },
      {
        path: "user/edit",
        component: UserEditComponent,
        resolve: { user: UserEditResolver }
      },
      { path: "activityTypes", component: ActivityTypesComponent },
      { path: "activityTypes/add", component: ActivityTypeAddComponent },
      { path: "activityTypes/:id", component: ActivityTypeEditComponent },
      { path: "statistics", component: StatisticComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
