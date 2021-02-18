import { action, computed, makeObservable, observable } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activities';
import * as agent from "../api/agent";

class ActivityStore {
    @observable title = "Home From Mobx";
    @observable errorMessage = "";
    @observable activitiesRegistered = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInital = false;
    @observable selectedActivity: IActivity | null= null;
    @observable submitting = false;
    @observable deleteSubmiting = false;
    @observable targets = "";

    
    constructor() {
        makeObservable(this);
    }
    @action clearingActivity =()=>{
        this.selectedActivity=null;
    }
    @computed get activitiesByDate() {
        return Array.from(this.activitiesRegistered.values());//.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
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
                ac.date = ac.date.split(".")[0];
                this.activitiesRegistered.set(ac.id,ac);
            });

        } catch (err) {
            this.errorMessage = "error is faild";
        } finally {
            this.loadingInital = false;
        }
    }
    @action loadActivity= async (id:string)=> {
        let activity = this.getActivity(id);
        if(activity ){
            this.selectedActivity = activity ;
            return;
        } 
        this.loadingInital = true;
        try {
            activity = await agent.Activities.details(id);
            this.selectedActivity = activity;
        }catch(err){
            console.log(err);
        }finally{
            this.loadingInital = false;
        }
    }
    getActivity=(id:string)=> {
        return this.activitiesRegistered.get(id);
    }
    @action selectActivity = (id: string) => {
        this.selectedActivity =this.activitiesRegistered.get(id); 
    }
    @action createActivity = async (activity: IActivity) => {
        try {
            await agent.Activities.create(activity);
            this.activitiesRegistered.set(activity.id,activity);
            this.submitting = false;
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
                this.selectedActivity=null;
            })
            .finally(() => {
                this.deleteSubmiting = false;
                this.targets = "";
            })
    }

    @action openCreateForm = () => {
        this.selectedActivity=null;
    }

    @action cancelledHandler = () => {
        this.selectedActivity=null;
    };

}

export default createContext(new ActivityStore());