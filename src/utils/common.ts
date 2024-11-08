import { message } from "antd";

export const showNotification = (
  text: string,
  type: "error" | "success" = "success"
) => {
  if (type === "error") {
    return message.error(text);
  }
  return message.success(text);
};

export function toFixedNumber(text: number) {
  if (!text) {
    return text;
  }
  if (Math.abs(text) < 1.0) {
    let e = parseInt(text.toString().split("e-")[1]);
    if (e) {
      text *= Math.pow(10, e - 1);
      (text as any) =
        "0." + new Array(e).join("0") + text.toString().substring(2);
    }
  } else {
    let e = parseInt(text.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      text /= Math.pow(10, e);
      (text as any) += new Array(e + 1).join("0");
    }
  }
  return text;
} // to show token values in fixed number

export const isValidArray = (arr: any[] | undefined | null): arr is any[] => {
  return Array.isArray(arr);
};

export const isValidArrayWithMinLength = (
  arr: any[] | undefined | null,
  minLength: number = 1
): boolean => {
  return isValidArray(arr) && arr.length >= minLength;
};

export const isValidObject = (obj: any): obj is Record<string, any> => {
  return typeof obj === "object" && obj !== null;
};

export const isValidArrayOfObjects = (
  arr: any[] | undefined | null
): arr is Record<string, any>[] => {
  return isValidArray(arr) && arr.every(isValidObject);
};

export const createAction = (type: string, payload = {}) => {
  return {
    type: type,
    payload: payload,
  };
};

export const logOut = () => {
  localStorage.clear();
  // showNotification("Logout Successful");
  // setTimeout(() => {
  //   window.location.reload();
  // }, 500);
};

export const USER_NAME_REGX =
  // eslint-disable-next-line no-useless-escape
  /^[a-zA-Z][a-zA-Z0-9_]{0,24}$/;
export const FIRST_LAST_NAME_REGX =
  // eslint-disable-next-line no-useless-escape
  /^[a-zA-Z]{1}[a-zA-Z]{2,24}$/;

export const formatUserName = (name: string) => {
  if (!name) return "";
  if (name.length >= 18) {
    const initialName = name.slice(0, 5);
    const lastName = name.slice(18, name.length);
    return `${initialName}....${lastName}`;
  }
  return name;
};

export const formatWalletAddress = (
  address: string,
  startLength: number = 10,
  lastLength: number = 10
) => {
  return address
    ? `${address.slice(0, startLength)}...${address.slice(-lastLength)} `
    : address;
};

export const isValidNumber = (value: any) => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

export const FIGHT_TOKEN_SYMBOL = "$FGHT";

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
