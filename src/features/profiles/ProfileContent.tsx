import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileDescribtion from './ProfileDescribtion';
import ProfilePhotos from './ProfilePhotos';

const panes = [
    {menuItem:"About",render:()=><ProfileDescribtion/>},
    {menuItem:"Photos",render:()=><ProfilePhotos/>},
    {menuItem:"Activities",render:()=><Tab.Pane>Activities Content</Tab.Pane>},
    {menuItem:"Followers",render:()=><Tab.Pane>Followers Content</Tab.Pane>},
    {menuItem:"Folloing",render:()=><Tab.Pane>Folloing Content</Tab.Pane>},
]

const ProfileContent = ()=>{
    return(
        <Tab
            menu={{fluid:true,vertical:true}}
            menuPosition="right"
            panes={panes}
            // activeIndex={1}
        />
    )
};

export default ProfileContent;