import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
  setImage: (file: Blob) => void;
  imagePreview: string;
}

const PhotoUploadWidgetCropper: React.FC<IProps> = ({
  setImage,
  imagePreview,
}) => {
    const cropperRef = useRef<HTMLImageElement>(null);
    const onCrop = () => {
      const imageElement: any = cropperRef?.current;
      const cropper: any = imageElement?.cropper;
      cropper.getCroppedCanvas().toBlob((blob:any) => {
        setImage(blob!);
      }, "image/jpeg");
  };

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1 / 1}
      guides={false}
      crop={onCrop}
      preview=".img-preview"
      dragMode="move"
      cropBoxMovable={true}
      cropBoxResizable={true}
    />
  );
};

export default PhotoUploadWidgetCropper;
