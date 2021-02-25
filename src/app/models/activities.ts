import { IAttendee } from "./user";

export interface IActivityEnvelope{
     activities :IActivity[];
     activitiesCount :number;
     activitiesLoadedCount :number;
}

export interface IActivity {
    id: string | undefined;
    title: string;
    description: string;
    city: string;
    category: string;
    date: Date | undefined;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
    comments: IComment[];

}
export interface IComment {
    id: string;
    createAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
}
export interface IActivityForms extends Partial<IActivity> {
    time?: Date;
}

export class ActivityForms implements IActivityForms {
    id: string | undefined = undefined;
    title: string = "";
    description: string = "";
    city: string = "";
    category: string = "";
    date: Date | undefined = undefined;
    time: Date | undefined = undefined;
    venue: string = "";

    constructor(init?: IActivityForms) {
        console.log({ init });
        if (init && init.date) {
            init.time = init.date;
        }
        Object.assign(this, init);
    }
}