import React, { Fragment, useEffect, useState } from "react";
import { Header, Grid, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoUploadWidjetDropzone from "./PhotoUploadWidjetDropzone";
import PhotoUploadWidgetCropper from "./PhotoUploadWidgetCropper";

interface IProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export const PhotoUploadWidget: React.FC<IProps> = ({
  uploadPhoto,
  loading,
}) => {
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.filter((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <PhotoUploadWidjetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <PhotoUploadWidgetCropper
              imagePreview={files[0].preview}
              setImage={setImage}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />

          {files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: "200px", overflow: "hidden" }}
              />
              <Button.Group fluid widths={2}>
                <Button
                  positive
                  icon="check"
                  loading={loading}
                  onClick={() => uploadPhoto(image!)}
                />
                <Button
                  negative
                  icon="close"
                  disabled={loading}
                  onClick={() => setFiles([])}
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);
