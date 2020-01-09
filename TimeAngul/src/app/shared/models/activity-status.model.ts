import { Activity } from "./activity.model";

export interface ActivityStatus {
  ActivityStatusId: number;
  ActivityStatusName: string;

  Activity?: Activity[];
}
