import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";

export const UploadImageAPI = async ({ fileType }: { fileType: string }) => {
  const dataToSend = {
    fileType,
  };
  try {
    const response = await HttpService.post(API_CONFIG.path.login, {
      ...dataToSend,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateImageAPI = async ({
  file,
  proofId,
}: {
  file: any;
  proofId: any;
}) => {
  const dataToSend = {
    file,
    proofId,
  };
  try {
    const response = await HttpService.post(API_CONFIG.path.login, {
      ...dataToSend,
    });
  } catch (error) {
    console.log(error);
  }
};
