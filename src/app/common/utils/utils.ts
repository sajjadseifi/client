import { IActivity } from "../../models/activities";
import { IAttendee, IUser } from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {

    const combineDate = new Date(date);

    combineDate.setHours(time.getHours());
    combineDate.setMinutes(time.getMinutes());
    combineDate.setSeconds(0);

    return combineDate;
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date!);
    activity.isGoing = activity.attendees.some(
        a => a.userName = user.userName
    );
    activity.isHost = activity.attendees.some(
        a => a.isHost && a.userName == user.userName
    );

    return activity;
};

export const createAttendees = (user: IUser): IAttendee => {
    return {
        userName: user.userName,
        displayName: user.displayName,
        image: user.image || "",
        isHost: false,
    };
};