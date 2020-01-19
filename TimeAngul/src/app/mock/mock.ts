import { ActivityType } from "../shared/models/activity-type";
import { User } from "../shared/models/user";
import { Activity } from "../shared/models/activity.model";
import { ActivityStatus } from "../shared/models/activity-status.model";
import { ActivityColor } from "../shared/models/activity-color.model";
import { ActivityTask } from "../shared/models/activity-task.model";
import { Schedule } from "../shared/models/schedule";
import { UserActivityType } from "../shared/models/user-activity-type";

export const mockUserActivityType = (): UserActivityType => {
  return {
    UserActivityTypeId: 1,
    ActivityTypeId: 1,
    TimeFrom: 12,
    TimeTo: 16,
    User: mockUser(),
    UserId: 1
  };
};

export const mockActivityType = (): ActivityType => {
  return {
    ActivityTypeId: 1,
    ActivityTypeName: "Fakultet",
    UserActivityType: mockUserActivityType()
  };
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
    ActivityName: "Rad na projektu",
    ActivityStatus: mockActivityStatus(),
    ActivityStatusId: 1,
    ActivityType: mockActivityType(),
    ActivityTypeId: 1,
    ActivityTask: [],
    User: mockUser(),
    DeadLine: new Date(),
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
    ActivityTaskName: "Napraviti bazu podataka",
    DonePercentage: "1/4",
    Duration: 5,
    Schedule: [mockSchedule(), mockSchedule()],
    NextOccurance: mockSchedule(),
    ActiveSchedule: mockSchedule()
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

// Lists for dropdowns
export const mockColorList = (): ActivityColor[] => {
  return [
    { ActivityColorId: 1, ActivityColorName: "Black" },
    { ActivityColorId: 2, ActivityColorName: "Red" }
  ];
};

export const mockActivityTypeList = (): ActivityType[] => {
  return [
    {
      ActivityTypeId: 1,
      ActivityTypeName: "Fakultet",
      UserActivityType: mockUserActivityType()
    },
    {
      ActivityTypeId: 2,
      ActivityTypeName: "Sport",
      UserActivityType: mockUserActivityType()
    }
  ];
};
