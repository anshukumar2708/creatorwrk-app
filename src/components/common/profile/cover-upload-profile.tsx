import { Upload } from "antd";
//@ts-ignore
import ImgCrop from "antd-img-crop";
import imageCompression from "browser-image-compression";
import { useCallback, useState } from "react";
import "./cropModel.css";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";

const CoverUploadProfile = ({ setCoverImageFile, setIsEdit }: any) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const notify = useNotificationToaster();

  const ImageSizeOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  };

  const beforeUpload = async (file: any) => {
    const allowedFileTypes = [".jpg", ".jpeg", ".png"];
    const fileExt = file.name
      .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();

    if (!allowedFileTypes.includes("." + fileExt)) {
      notify("error", "Please upload only images (jpg, jpeg, png) files.");
      return Upload.LIST_IGNORE;
    }
    const compressedFile = await imageCompression(file, ImageSizeOptions);

    if (compressedFile) {
      const imageSize = compressedFile.size / 1024 / 1024;

      if (Number(imageSize.toFixed(2)) > 1) {
        notify("error", "Image must be smaller than 1MB!");
        return Upload.LIST_IGNORE;
      }
      setCoverImageFile(compressedFile);
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

  const handleDelete = () => {
    setFileList([]);
    setCoverImageFile(null);
    // message.success("Cover photo deleted successfully!");
    notify("success", "Cover photo deleted successfully!");
  };

  const customUploadButton = (
    <div className="sm:w-180 sm:h-41 w-[105px] bg-gray-200 hover:shadow-custom-hover cursor-pointer h-[32px] bg-custom-gradient rounded-500 text-white font-semibold text-sm sm:text-base leading-18.77 flex justify-center items-center">
      Cover photo
    </div>
  );

  return (
    <div className="flex flex-col justify-center">
      <div className="">
        <div className="mt-2 flex gap-2">
          {fileList.length > 0 && (
            <div
              onClick={handleDelete}
              className="flex items-center cursor-pointer justify-center bg-white h-[40px] w-[147px] text-[#010314] text-base font-semibold rounded-[60px]"
            >
              Delete
            </div>
          )}
          <ImgCrop aspect={1138 / 400} quality={1} showReset>
            <Upload
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              beforeUpload={beforeUpload}
              fileList={fileList}
              showUploadList={false}
              customRequest={customRequest}
            >
              {customUploadButton}
            </Upload>
          </ImgCrop>
        </div>
      </div>
    </div>
  );
};

export default CoverUploadProfile;
