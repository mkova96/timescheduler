import { ActivityTask } from './activity-task.model';

export class Schedule {
    ScheduleId:number;
    Date:Date; //nisam siguran kako s datumom
    TimeFrom:number;
    TimeTo:number;
    Moveable:boolean;

    ActivityTaskId: number;
    ActivityTask:ActivityTask;
}