import React, { useEffect, useRef, useCallback, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface CropperModalProps {
  modalStatus: Boolean;
  setStatus: (status: boolean) => void;
  value: File | undefined;
  setFieldValue: (field: string, value: any) => void;
  setCroppedImage: (state: File) => void;
  setValue: (state: File | undefined) => void;
}

const CropperModal: React.FC<CropperModalProps> = ({
  modalStatus,
  setStatus,
  value,
  setFieldValue,
  setCroppedImage,
  setValue,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value as Blob);
      setImageSrc(objectUrl);

      // Clean up the object URL when the component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageSrc(null);
    }
  }, [value]);
  console.log(value?.name, "nnnn");

  const handleCrop = useCallback(() => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
        if (!blob || !value) {
          return;
        }

        const originalFileName = value.name as string;
        const fileExtension = originalFileName.substring(
          originalFileName.lastIndexOf(".")
        );
        const fileName = originalFileName.replace(
          fileExtension,
          "_cropped" + fileExtension
        );

        const croppedFile = new File([blob], fileName, { type: blob.type });
        console.log(croppedFile, "hmmm");

      
 setCroppedImage(croppedFile)
 setFieldValue('image',croppedFile)
      
        setStatus(false);
      });
    }
  }, [value, setFieldValue, setStatus, setCroppedImage]);

  const memoizedCropper = useCallback(
    () => (
      <Cropper
        src={imageSrc || ""}
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        viewMode={1}
        ref={cropperRef}
        background={true}
      />
    ),
    [imageSrc]
  );

  return (
    <div
      className={`fixed bg-black bg-opacity-50 z-100 flex items-center justify-center ${
        modalStatus ? "" : "hidden"
      }`}
      onClick={() => {
        setStatus(false);
        setValue(undefined);
        setImageSrc(null);
      }}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside it
      >
        <div className="flex justify-end mb-2">
          <button
            className="text-black font-bold"
            onClick={() => {
              setStatus(false);
              setValue(undefined);
              setImageSrc(null); // Reset imageSrc when closing modal
            }}
          >
            &times;
          </button>
        </div>
        {imageSrc && memoizedCropper()}
        <button
          onClick={handleCrop}
          className="bg-base-100 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
        >
          Crop Image
        </button>
      </div>
    </div>
  );
};

export default CropperModal;
