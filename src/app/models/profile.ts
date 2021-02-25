export interface IProfile{
    displayName:string;
    userName:string;
    bio:string;
    following:boolean;        
    followersCount:number;
    followingCount:number;
    // isFollowed:boolean;
    image?:string;
    photos:IPhoto[];
}

export interface IPhoto{
    id:string;
    url:string;
    isMain:boolean;
}