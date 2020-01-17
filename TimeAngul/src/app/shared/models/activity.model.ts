import { ActivityTask } from "./activity-task.model";
import { ActivityStatus } from "./activity-status.model";
import { ActivityColor } from "./activity-color.model";
import { User } from "./user";
import { ActivityType } from './activity-type';

export interface Activity {
  ActivityId: number;
  ActivityName: string;
  DeadLine:Date;

  ActivityStatusId: number;
  ActivityStatus: ActivityStatus;

  ActivityColorId: number;
  ActivityColor: ActivityColor;

  ActivityTypeId: number;
  ActivityType: ActivityType;

  UserId: number;
  User: User;

  ActivityTask: ActivityTask[];
}
