import { UserActivityType } from './user-activity-type';
import { Activity } from './activity.model';

export interface User {
  UserId: number;
  Email: string;
  FirstName: string;
  LastName: string;

  Activity:Activity[];
  UserActivityType:UserActivityType[];
}
