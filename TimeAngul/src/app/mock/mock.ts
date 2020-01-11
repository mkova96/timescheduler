import { ActivityType } from "../shared/models/activity-type";
import { User } from "../shared/models/user";
import { Activity } from "../shared/models/activity.model";
import { ActivityStatus } from "../shared/models/activity-status.model";
import { ActivityColor } from "../shared/models/activity-color.model";
import { ActivityTask } from "../shared/models/activity-task.model";
import { Schedule } from "../shared/models/schedule";

export const mockActivityType = (): ActivityType => {
  return { ActivityTypeId: 1, ActivityTypeName: "Tip aktivnosti" };
};

export const mockUser = (): User => {
  return {
    UserId: 1,
    Email: "test@test.com",
    FirstName: "Miho",
    LastName: "Mo"
  };
};

export const mockActivity = (): Activity => {
  return {
    ActivityColor: mockColor(),
    ActivityColorId: 1,
    ActivityId: 1,
    ActivityName: "Activity 1",
    ActivityStatus: mockActivityStatus(),
    ActivityStatusId: 1,
    ActivityTask: [],
    User: mockUser(),
    UserId: 1
  };
};

export const mockActivityStatus = (): ActivityStatus => {
  return { ActivityStatusId: 1, ActivityStatusName: "Not done" };
};

export const mockColor = (): ActivityColor => {
  return { ActivityColorId: 1, ActivityColorName: "rebeccapurple" };
};

export const mockActivityTask = (): ActivityTask => {
  return {
    ActivityId: 1,
    Activity: mockActivity(),
    ActivityTaskId: 1,
    ActivityTaskName: "Task 1",
    DonePercentage: "1/4",
    Duration: 5,
    Schedule: [mockSchedule(), mockSchedule()]
  };
};

export const mockSchedule = (): Schedule => {
  return {
    Date: new Date(),
    Moveable: true,
    ScheduleId: 1,
    TimeFrom: 10,
    TimeTo: 15
  };
};
