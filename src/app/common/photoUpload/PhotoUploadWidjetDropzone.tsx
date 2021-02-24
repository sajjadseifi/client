import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

const dropzoneStyle = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderradius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px",
};
const dropzoneActive = {
  borderColor: "green",
};

const PhotoUploadWidjetDropzone: React.FC<{
  setFiles: (files: { preview: string }[]) => void;
}> = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file: object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropzoneStyle, ...dropzoneActive } : dropzoneStyle
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};

export default PhotoUploadWidjetDropzone;
