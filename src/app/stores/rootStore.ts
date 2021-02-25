import { configure, makeAutoObservable, makeObservable } from "mobx";
import { createContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import { ModalStore } from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

configure({enforceActions:"always"});

export class RootStore {

    activityStore :ActivityStore;
    userStore :UserStore;
    commonStore :CommonStore;
    modalStore: ModalStore;
    profileStore:ProfileStore;
    constructor(){ 
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        
        makeObservable(this.activityStore);
        makeObservable(this.userStore);
        makeObservable(this.commonStore);
        makeObservable(this.modalStore);
        makeObservable(this.profileStore);
    }
}

export const RootStoreContext = createContext(new RootStore());