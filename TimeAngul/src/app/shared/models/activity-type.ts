import { Activity } from "./activity.model";

export interface ActivityType {
  ActivityTypeId: number;
  ActivityTypeName: string;
  Activity?: Activity[];
}
