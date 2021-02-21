import { action, makeObservable, observable, reaction } from "mobx";
import BaseStore from "./baseStore";
import { RootStore } from "./rootStore";

export default class CommonStore extends BaseStore {

    constructor(public rootStore: RootStore) {
        super(rootStore);

        reaction(() => this.token, token => {
            console.log("token : = : ", { token });
            if (token)
                window.localStorage.setItem("jwt", token!);
            else
                window.localStorage.removeItem("jwt");
        })
    }

    @observable appLoaded: boolean = false;
    @observable token: string | null = window.localStorage.getItem("jwt");

    @action setAppLoaded = () => {
        this.appLoaded = true;
        console.log("this.appLoaded", this.appLoaded)
    }
    @action setAppDisLoaded = () => {
        this.appLoaded = false;
        console.log("this.appLoaded", this.appLoaded)
    }
    @action setToken = (token: string) => {
        window.localStorage.setItem("jwt", token);
        this.token = token;
    }
    @action removeToken = () => {
        window.localStorage.removeItem("jwt");
        this.token = null;
    }
}