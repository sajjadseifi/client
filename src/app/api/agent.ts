import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IActivity } from "../models/activities";
import { IUser, IUserFormVlues } from '../models/user';

const baseURL = 'http://localhost:5000/api/';
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("jwt");
    console.log({token});

    if(token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
});

axios.interceptors.response.use(undefined, error => {
    if(error.message="Network Error" && !error.response){
        toast.error("Network error: make shure api is running!");
    }
    const { status, config, data } = error.response;
    console.log({status});
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
};
const Activities = {
    list: (): Promise<IActivity[]> => requests.get("/activities"),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post("/activities", activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`),
};

const User = {
    current:():Promise<IUser> => requests.get("/user"),
    login: (user: IUserFormVlues) => requests.post("/user/login",user),
    register: (user: IUserFormVlues) => requests.post("/user/register",user),
};

export {
    Activities,
    User
};