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
}
