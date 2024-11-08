export const uploadFileToS3 = (
  imgResponse: any,
  imageFile: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const s3SecurityData = imgResponse.fields;
    for (const key in s3SecurityData) {
      formData.append(key, s3SecurityData[key]);
    }
    formData.append(
      "file",
      imageFile.originFileObj ? imageFile.originFileObj : (imageFile as File)
    ); //
    const xhr = new XMLHttpRequest();
    xhr.open("POST", imgResponse.uploadUrl, true);
    xhr.send(formData);
    xhr.onload = function () {
      this.status === 204
        ? resolve(imgResponse.avatarUrl)
        : reject(this.responseText);
    };
  });
};
