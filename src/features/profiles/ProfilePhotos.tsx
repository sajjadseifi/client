import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/photoUpload/PhotoUploadWidget";
import { RootStoreContext } from "../../app/stores/rootStore";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadLoading,
    uploadPhoto,
    loadingSetMain,
    setMainPhoto,
    deletePhoto,
    setActiveTab,
    loadingDelete
  } = rootStore.profileStore;
  const [addPhotoMoe, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");
  const [targetDelete, setTargetDelete] = useState("");

  const uploadPhotoHandler = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMoe ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMoe)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMoe ? (
            <PhotoUploadWidget
              uploadPhoto={uploadPhotoHandler}
              loading={uploadLoading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          onClick={() => {
                            setMainPhoto(photo);
                            setTarget(photo.id);
                          }}
                          loading={loadingSetMain && target == photo.id}
                          disabled={photo.isMain}
                          basic
                          positive
                          content="Main"
                        />
                        <Button
                          onClick={() => {
                            deletePhoto(photo);
                            setTargetDelete(photo.id);
                          }}
                          loading={loadingDelete && targetDelete == photo.id}
                          disabled={photo.isMain}
                          basic
                          negative
                          icon="trash"
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
export default observer(ProfilePhotos);
