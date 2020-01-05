import { ActivityTask } from './activity-task.model';

export class Activity {
    ActivityId: number;
    ActivityName:string;

    ActivityStatusId: number;
    UserId: number;

    ActivityTask:ActivityTask[];
    //DeletedOrderItemIDs: string;
}
