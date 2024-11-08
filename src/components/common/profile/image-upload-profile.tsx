import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import "./cropModel.css";
import UploadIcon from "../../../assets/images/svg/upload-icon";
import imageCompression from "browser-image-compression";

interface IProps {
  profileData: any;
  setImageFile: any;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setImageErrorMsg: Dispatch<SetStateAction<string | null>>;
}

const UploadProfileImage = ({
  profileData,
  setImageFile,
  setIsEdit,
  setImageErrorMsg,
}: IProps) => {
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
      setImageErrorMsg("Please upload only images (jpg, jpeg, png) files.");
      return Upload.LIST_IGNORE;
    }
    const compressedFile = await imageCompression(file, ImageSizeOptions);

    if (compressedFile) {
      const imageSize = compressedFile.size / 1024 / 1024;

      if (Number(imageSize.toFixed(2)) > 1) {
        setImageErrorMsg("Image must be smaller than 1MB!");
        return Upload.LIST_IGNORE;
      }
      setImagePreview(URL.createObjectURL(compressedFile));
      setImageFile(compressedFile);
      setImageErrorMsg(null);
      return true;
    }
  };

  const handleImageChange = useCallback(() => {
    setIsEdit(true);
  }, [setIsEdit]);

  const customRequest = ({ onSuccess }: any) => {
    // Call onSuccess to simulate a successful upload
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  let renderImage: string = profileData?.profileImageUri;

  return (
    <>
      <div className="flex flex-col justify-center md:ms-auto items-center md:items-end">
        <div className="relative md:w-[150px] w-[130px] md:h-[150px] h-[130px] rounded-[20px] bg-smallBlue border-1 border-[#901a8a]">
          <div className="w-full">
            {(renderImage || imagePreview) && (
              <img
                src={imagePreview ? imagePreview : renderImage}
                className="avtProfile m-0 p-0 h-full w-full"
                loading="lazy"
                alt="profile"
              />
            )}
            {!renderImage && !imagePreview && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl  text-white">
                  {profileData?.name
                    ? profileData.name.charAt(0).toUpperCase()
                    : ""}
                </h1>
              </div>
            )}
          </div>
          <div className="absolute -bottom-4 left-0 w-full flex justify-center items-center">
            <ImgCrop rotationSlider aspect={1} quality={1} showReset>
              <Upload
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                beforeUpload={beforeUpload}
                showUploadList={false}
                customRequest={customRequest}
              >
                <div className="bg-uploadProfileIcon rounded-full w-[36px] h-[36px] flex flex-col justify-center items-center cursor-pointer">
                  <UploadIcon />
                </div>
              </Upload>
            </ImgCrop>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProfileImage;
