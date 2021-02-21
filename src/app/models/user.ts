export interface IUser{
    displayName:string;
    userName:string;
    token:string;
    image?:string;
}

export interface IUserFormVlues{
    email:string;
    password:string;
    displayName?:string;
    userName?:string;
}