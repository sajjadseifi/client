import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDescribtion = () => {
    const rootStore = useContext(RootStoreContext);
  const {isCurrentUser,profile,updateProfile} =rootStore.profileStore;
  const [editMode,setEditMode] = useState(false); 
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile!.userName}`}
          />
        {isCurrentUser && (
            <Button
                floated="right"
                basic
                content={editMode ? "Cancel" :"Edit Profile"}
                onClick={()=>setEditMode(!editMode)}
            />
        )}
        </Grid.Column>
        <Grid.Column width={16}>
            {editMode?(
                <ProfileEditForm
                    profile={profile!}
                    updateProfile={updateProfile}
                />
            ):(
                <span>{profile!.bio}</span>
            )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescribtion);
