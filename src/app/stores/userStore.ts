import { action, computed, observable } from "mobx";
import { IUser, IUserFormVlues } from "../models/user";
import * as agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import BaseStore from "./baseStore";

export default class UserStore extends BaseStore {
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user };

    @action login = async (values: IUserFormVlues) => {

        try {
            const user = await agent.User.login(values);
            this.user = user;
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.Close();
            history.push("/activities");
            toast.warning(`${this.user?.displayName} Welcom to activities application!`);
        } catch (error) {
            console.error(error);
            throw error;

        }
    }
    @action register = async (values: IUserFormVlues) => {
        console.log({values});
        // return null;    
        try {
            const user = await agent.User.register(values);
            this.user = user;
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.Close();
            toast.warning(`${this.user?.displayName} Welcom to activities application!`);
            history.push("/activities");
        } catch (error) {
            console.error(error);
            throw error;

        }
    }
    @action getUser= async()=>{
        try {
            const user = await agent.User.current();
            this.user = user;

            return user;
        }catch (error) {
            console.log(error);
            throw error;
        }   
    }
    @action logout = async () => {
        toast.info(`${this.user?.displayName} Welcom to activities application!`);
        this.rootStore.commonStore.removeToken();
        this.user = null;
        history.push("/");
    }
} 