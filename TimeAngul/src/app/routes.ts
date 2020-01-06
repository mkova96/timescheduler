import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { ActivitiesComponent } from './activities/activities.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserActivityResolver } from './_resolvers/user-activity.resolver';
import { ActivityTypesComponent } from './activity-types/activity-types.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'activities', component: ActivitiesComponent},
            {path:'user/edit',component:UserEditComponent,resolve :{user:UserEditResolver}},
            {path: 'activityTypes', component: ActivityTypesComponent},
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
