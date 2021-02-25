import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IActivity, IActivityEnvelope } from "../models/activities";
import { IPhoto, IProfile } from '../models/profile';
import { IUser, IUserFormVlues } from '../models/user';

const baseURL = 'http://localhost:5000/api/';
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("jwt");
    console.log({ token });

    if (token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
});

axios.interceptors.response.use(undefined, error => {
    if (error.message = "Network Error" && !error.response) {
        toast.error("Network error: make shure api is running!");
    }
    const { status, config, data } = error.response;
    console.log({ status });
    if (status === 500) {
        toast.error("Server Is Error - check your terminal");
        history.push("/activities");
    }
    else if (status === 404) {
        history.push("/not-found");
    }
    else if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty("id")) {
        history.push("/not-found");
    }
    throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>(
    (resolve, reject) => setTimeout(() => resolve(response), ms)
)

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
    postForm: (url: string, blob: Blob) => {
        const formData = new FormData();
        formData.append("File", blob);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json',
            },
            mode: 'cors',
        };
        return axios.post(url, formData, config).then(responseBody);
    }
};

const Activities = {
    list: (params: URLSearchParams): Promise<IActivityEnvelope> =>
        axios.get(`/activities`, { params }).then(sleep(1000)).then(responseBody),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post("/activities", activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`),
    attend: (id: string) => requests.put(`/activities/${id}/attend`, {}),
    unattend: (id: string) => requests.del(`/activities/${id}/unattend`),
};
const User = {
    current: (): Promise<IUser> => requests.get("/user"),
    login: (user: IUserFormVlues) => requests.post("/user/login", user),
    register: (user: IUserFormVlues) => requests.post("/user/register", user),
};
const Profile = {
    get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
    uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.post("/photos", photo),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setmain`, {}),
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    updateProfile: (profile: Partial<IProfile>) => requests.put("/profiles", profile),
    follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
    unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
    listFolloings: (username: string, predicate: string) => requests
        .get(`/profiles/${username}/follow?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) => requests
        .get(`/profiles/${username}/activities?predicate=${predicate}`)
};
export {
    Activities,
    User,
    Profile
};