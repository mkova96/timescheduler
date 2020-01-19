import { Activity } from "./activity.model";
import { UserActivityType } from './user-activity-type';

export interface ActivityType {
  ActivityTypeId: number;
  ActivityTypeName: string;
  Activity?: Activity[];
  UserActivityType: UserActivityType;
}

export interface ActivityTypeForm {
  ActivityTypeId?: number;
  ActivityTypeName: string;
  TimeFrom: number;
  TimeTo: number;
}
