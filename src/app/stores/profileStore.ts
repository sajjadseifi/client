import { action, computed, observable } from "mobx";
import { IPhoto, IProfile } from "../models/profile";
import BaseStore from "./baseStore";
import * as agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfileStore extends BaseStore {

    @observable profile: IProfile | null = null;
    @observable loadingProfile: boolean = true;
    @observable uploadLoading: boolean = false;
    @observable loadingSetMain: boolean = false;
    @observable loadingDelete: boolean = false;

    @computed get isCurrentUser() {
        const u = this.rootStore.userStore.user;
        const up = this.profile;

        if (up && u) {
            console.log(u?.userName, up, u.userName == up.userName);
            return u.userName == up.userName;
        }
        else
            return false;
    };
    @action loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profile.get(username);
            this.profile = profile;
            console.log({ profile });
        } catch (error) {
            console.log(error);
        } finally {
            this.loadingProfile = false;
        }
    };

    @action uploadPhoto = async (file: Blob) => {
        this.uploadLoading = true;
        try {
            const photo = await agent.Profile.uploadPhoto(file);
            if (this.profile) {
                this.profile.photos.push(photo);
                const user = this.rootStore.userStore.user;
                if (photo.isMain && user) {
                    user.image = photo.url;
                    this.profile.image = photo.url;
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Problem uploading photo");
        } finally {
            this.uploadLoading = false;
        }
    }
    @action setMainPhoto = async (photo: IPhoto) => {
        this.loadingSetMain = true;
        try {
            await agent.Profile.setMainPhoto(photo.id);
            this.profile!.photos.find(a => a.isMain)!.isMain = false;
            this.profile!.photos.find(a => a.id == photo.id)!.isMain = true;
            this.rootStore.userStore.user!.image = photo.url;
            this.profile!.image = photo.url;
        } catch (error) {
            console.log(error);
            toast.error("Problem setting photo as main");
        } finally {
            this.loadingSetMain = false;
        }
    }

    @action deletePhoto = async (photo: IPhoto) => {
        this.loadingDelete = true;
        try {
            await agent.Profile.deletePhoto(photo.id);
            this.profile!.photos = this.profile!.photos
                .filter(a => a.id !== photo.id);
        } catch (error) {
            toast.error("Problem deleting the photo");
        } finally {
            this.loadingDelete = false;
        }
    }
    @action updateProfile = async (profile: Partial<IProfile>) => {
        try {
            await agent.Profile.updateProfile(profile);
            this.rootStore.userStore.user!.displayName = profile.displayName!;
            this.profile = { ...this.profile!, ...profile };

        } catch (error) {
            toast.error("Problem Edit Profile");
        } finally {

        }
    }
}