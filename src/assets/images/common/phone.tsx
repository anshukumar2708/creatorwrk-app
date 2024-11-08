import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
const Phone = (props: any) => (
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
      d="M4.76 3.662l.138-.135a2 2 0 012.706 0c.031.029.067.064.137.135L9.2 5.12a2.759 2.759 0 01.578 3.053 2.759 2.759 0 00.578 3.053l2.397 2.397a2.758 2.758 0 003.053.578 2.759 2.759 0 013.053.578l1.458 1.459c.07.07.106.106.135.137a2 2 0 010 2.706c-.029.031-.064.067-.135.137l-.886.887a2.985 2.985 0 01-2.759.803 17.913 17.913 0 01-13.6-13.601 2.986 2.986 0 01.803-2.759l.886-.886z"
    ></path>
  </svg>
);

const PhoneIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon className="text-xl select-arrow-icon" component={Phone} {...props} />
);
export default PhoneIcon;
