import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
const Message = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#8688A5"
      strokeWidth="1.5"
      d="M2.608 5.648C2 6.936 2 8.774 2 12c0 3.75 0 5.625.955 6.939a5 5 0 001.106 1.106C5.375 21 7.251 21 11 21h2c3.75 0 5.625 0 6.939-.955a5 5 0 001.106-1.106C22 17.625 22 15.749 22 12c0-3.249 0-5.09-.621-6.379m-18.771.027c.099-.209.214-.403.347-.587A5 5 0 014.06 3.955C5.375 3 7.251 3 11 3h2c3.75 0 5.625 0 6.939.955a5 5 0 011.106 1.106c.128.176.238.361.334.56m-18.771.027L3 6l1.929 1.929c3.333 3.333 5 5 7.071 5 2.071 0 3.738-1.667 7.071-5L21 6l.379-.379"
    ></path>
  </svg>
);

const MessageIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon className="text-xl select-arrow-icon" component={Message} {...props} />
);
export default MessageIcon;
