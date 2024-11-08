import { useCallback, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import UploadIcon from "../../assets/images/svg/upload-icon";
import AvatarImage from "../common/avatar-image/avatar-image";
import imageCompression from "browser-image-compression";

const UploadProfileImage = ({
  profileData,
  setImageFile,
  setIsEdit,
  setImgIsErrorMsg,
  setIsUploadedImageFile,
}: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const ImageSizeOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };

  const beforeUpload = async (file: any) => {
    const allowedFileTypes = [".jpg", ".jpeg", ".png"];
    const fileExt = file.name
      .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();

    if (!allowedFileTypes.includes("." + fileExt)) {
      setImgIsErrorMsg("Please upload only images (jpg, jpeg, png) files.");
      return Upload.LIST_IGNORE;
    }
    const compressedFile = await imageCompression(file, ImageSizeOptions);

    if (compressedFile) {
      const imageSize = compressedFile.size / 1024 / 1024;

      if (Number(imageSize.toFixed(2)) > 1) {
        setImgIsErrorMsg("Image must be smaller than 1MB!");
        return Upload.LIST_IGNORE;
      }
      setImagePreview(URL.createObjectURL(compressedFile));
      setImageFile(compressedFile);
      setImgIsErrorMsg(null);
      return true;
    }
  };

  const handleImageChange = useCallback(() => {
    setIsEdit(true);
    setIsUploadedImageFile("");
  }, [setIsEdit, setIsUploadedImageFile]);

  const customRequest = ({ onSuccess }: any) => {
    // Call onSuccess to simulate a successful upload
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="flex flex-col justify-center absolute right-0">
      <div className="relative w-profileImage h-profileImage rounded-full">
        <div className="absolute -bottom-3">
          <ImgCrop
            rotationSlider
            zoomSlider
            aspect={1 / 1}
            quality={1}
            showReset
          >
            <Upload
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              beforeUpload={beforeUpload}
              showUploadList={false}
              customRequest={customRequest}
            >
              <div className="rounded-full flex flex-col justify-center items-center cursor-pointer relative">
                <AvatarImage
                  imageUrl={imagePreview || profileData?.profileImageUri}
                  size={80}
                  name={profileData.name}
                />
                <div className="w-6 h-6 absolute left-center -bottom-3 bg-uploadProfileIcon rounded-full flex flex-row justify-center items-center">
                  <UploadIcon />
                </div>
              </div>
            </Upload>
          </ImgCrop>
        </div>
      </div>
    </div>
  );
};

export default UploadProfileImage;
