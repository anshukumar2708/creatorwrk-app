let token = localStorage.getItem("token") || "";

const getAccessToken = (): string => {
  if (token && token !== "") {
    return token;
  }
  return "";
};

/**
 * function to set user authentication data
 */
const setAccessToken = (data: string): void => {
  token = data;
  localStorage.setItem("token", data);
};

const getUserLng = (): string => {
  let lng = localStorage.getItem("lang");
  if (!lng) {
    const navigatorLng = navigator?.language; //will return en-EN format;
    const splittedLng = navigatorLng.split("-") || [];
    lng = splittedLng[0];
  }
  return lng || "en"; //if nothing is there set default lng to en
};

const AuthService = {
  getAccessToken: getAccessToken,
  setAccessToken: setAccessToken,
  getUserLng,
};
export default AuthService;
