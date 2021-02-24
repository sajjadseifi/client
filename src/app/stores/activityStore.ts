import { action, computed, makeObservable, observable } from 'mobx';
import { SyntheticEvent } from 'react';
import { IActivity } from '../models/activities';
import * as agent from "../api/agent";
import { RootStore } from './rootStore';
import BaseStore from './baseStore';
import { createAttendees, setActivityProps } from '../common/utils/utils';
import { history } from '../..';
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { error } from 'console';
import { toast } from 'react-toastify';
export default class ActivityStore extends BaseStore {
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this);
    }

    @observable title = "Home From Mobx";
    @observable errorMessage = "";
    @observable activitiesRegistered = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInital = false;
    @observable selectedActivity: IActivity | null = null;
    @observable submitting = false;
    @observable deleteSubmiting = false;
    @observable targets = "";
    @observable loading = false;
    @observable hubConnections: HubConnection | null = null;


    @action createHubConnection = (activityId: string) => {
        this.hubConnections = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/chat", {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnections.start()
            .then(() => console.log(this.hubConnections!.state))
            .then(() => {
                console.log("Attemptiong to join group");
                this.hubConnections!.invoke("AddToGroup", activityId)
            })
            .catch(error => console.warn("Error establishing connection", error))

        this.hubConnections.on("ReciveComment", comment => {
            this.selectedActivity!.comments.push(comment);
        });
        this.hubConnections.on("Send", message => {
            toast.info(message);
        });
    }
    @action stopHubConnection = () => {
        this.hubConnections!.invoke("RemoveToGroup",
            this.selectedActivity!.id)
            .then(() => this.hubConnections!.stop())
            .then(() => console.log("Connection Stopped"))
            .catch(err => console.log(err));
    }
    @action addComment = async (value: any) => {
        value.activityId = this.selectedActivity!.id;
        try {
            await this.hubConnections!.invoke("SendComment", value);
        } catch (error) {
            console.log(error);
        }
    }
    @action clearingActivity = () => {
        this.selectedActivity = null;
    }
    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activitiesRegistered.values()));
    }
    groupActivitiesByDate = (activities: IActivity[]) => {
        const sortedActivities = activities.sort(
            (a, b) => a.date!.getTime() - b.date!.getTime()
        );
        const groupActivitiesByDate = Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date!.toISOString();

            activities[date] = activities[date] ? [...activities[date], activity] : [activity];

            return activities;

        }, {} as { [key: string]: IActivity[] }));
        return groupActivitiesByDate;
    }
    @action fetched = () => {
        this.submitting = true;
    };
    @action loadActivities = async () => {
        this.errorMessage = "";
        this.loadingInital = true;
        this.activities = [];
        try {
            const response = await agent.Activities.list();
            this.loadingInital = false;

            response.forEach((ac) => {
                setActivityProps(ac, this.rootStore.userStore.user!);
                this.activitiesRegistered.set(ac.id, ac);
            });

        } catch (err) {
            this.errorMessage = "error is faild";
        } finally {
            this.loadingInital = false;
        }
    }
    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        this.loadingInital = true;
        try {
            activity = await agent.Activities.details(id);
            setActivityProps(activity, this.rootStore.userStore.user!);
            this.selectedActivity = activity;
            return activity;
        } catch (err) {
            console.log(err);
        } finally {
            this.loadingInital = false;
        }
    }
    getActivity = (id: string) => {
        return this.activitiesRegistered.get(id);
    }
    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistered.get(id);
    }
    @action createActivity = async (activity: IActivity) => {
        try {
            await agent.Activities.create(activity);
            const attendee = await createAttendees(this.rootStore.userStore.user!);
            activity.attendees = [attendee];
            attendee.isHost = true;
            activity.isHost = true;
            activity.comments = [];
            this.submitting = false;
            this.activitiesRegistered.set(activity.id, activity);

            history.push(`/activities/${activity.id}`);
        }
        catch (e) {
            this.submitting = false;
            console.log(e);
        }
    };
    @action editActivity = async (activity: IActivity) => {
        try {
            await agent.Activities.update(activity);
            this.activities = [activity, ...this.activities.filter((ac) => ac.id !== activity.id)];
            this.submitting = false;
            this.selectedActivity = activity;
        }
        catch (e) {
            this.submitting = false;
            console.log(e);
        }
    };
    @action deleteFetched = () => {
        this.deleteSubmiting = true;
    }
    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.deleteSubmiting = true;
        this.targets = event.currentTarget.name;
        agent.Activities.delete(id)
            .then(() => {
                this.activities = [...this.activities.filter((activity) => activity.id !== id)];
                if (this.selectedActivity && this.selectedActivity.id === id)
                    this.selectedActivity = null;
            })
            .finally(() => {
                this.deleteSubmiting = false;
                this.targets = "";
            })
    }

    @action openCreateForm = () => {
        this.selectedActivity = null;
    }

    @action cancelledHandler = () => {
        this.selectedActivity = null;
    };

    @action attendActivity = async () => {
        if (!this.selectedActivity)
            return;
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity.id!);

            const attend = createAttendees(this.rootStore.userStore.user!);
            this.selectedActivity.attendees.push(attend);
            this.selectedActivity.isGoing = true;
            this.activitiesRegistered.set(
                this.selectedActivity.id, this.selectedActivity
            );
        } catch (error) {
            console.log(error);
            throw error;

        } finally {
            this.loading = false;
        }

    }

    @action cancelAttendees = async () => {

        if (this.rootStore.userStore.user == null || !this.selectedActivity) {
            history.push("/login");
            return;
        }
        this.loading = true;
        try {
            await agent.Activities.unattend(this.selectedActivity.id!);

            this.selectedActivity.attendees = this.selectedActivity.attendees.filter((sa) => {
                console.log(sa.userName, " --- ", this.rootStore.userStore.user?.userName, sa.userName !== this.rootStore.userStore.user?.userName);
                return sa.userName !== this.rootStore.userStore.user?.userName
            }
            );
            this.selectedActivity.isGoing = false;
            this.activitiesRegistered.set(this.selectedActivity.id, this.selectedActivity);

        } catch (error) {
            console.log(error);
            // throw error;

        } finally {
            this.loading = false;
        }


    }
}
