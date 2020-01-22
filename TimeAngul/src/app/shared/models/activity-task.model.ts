import { Activity } from "./activity.model";
import { Schedule } from "./schedule";

export interface ActivityTask {
  ActivityTaskId: number;
  ActivityTaskName: string;
  Duration: number;
  DonePercentage: string;

  ActivityId: number;
  Activity?: Activity;

  Schedule: Schedule[];
  NextOccurance: Schedule;
  ActiveSchedule: Schedule;
}


export enum TaskType {
  Fixed = "fixed",
  Auto = "auto"
}

export interface ActivityTaskForm {
  ActivityTaskId?: number;
  ActivityTaskName: string;
  Type?: TaskType;
  TimeFrom?: number;
  TimeTo?: number;
  Duration?: number;
  FixedDate?: Date;
}

export enum WorkedOnTask {
  YES = "yes",
  NO = "no"
}

export interface ActivityTaskWorkedOnForm {
  ActivityTaskId: number;
  workedOnTask: WorkedOnTask;
  timeFrom?: number;
  timeTo?: number;
}
