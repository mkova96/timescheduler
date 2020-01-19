import { User } from "./user";
import { ActivityTypesComponent } from "src/app/activity-types/activity-types.component";
import { ActivityType } from "./activity-type";

export interface UserActivityType {
  UserActivityTypeId: number;
  TimeFrom: number;
  TimeTo: number;

  UserId: number;
  User: User;

  ActivityTypeId: number;
  ActivityType?: ActivityType;
}