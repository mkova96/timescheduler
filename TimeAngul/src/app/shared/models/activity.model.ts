import { ActivityTask } from './activity-task.model';
import { ActivityStatus } from './activity-status.model';
import { ActivityColor } from './activity-color.model';
import { User } from './user';

export class Activity {
    ActivityId: number;
    ActivityName:string;

    ActivityStatusId: number;
    ActivityStatus:ActivityStatus;

    ActivityColorId:number;
    ActivityColor:ActivityColor;

    UserId: number;
    User:User;

    ActivityTask:ActivityTask[];
}
