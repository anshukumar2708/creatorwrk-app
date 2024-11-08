import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
const SelectArrow = (props: any) => (
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M19 8.5l-7 7-7-7"
    ></path>
  </svg>
);

const SelectArrowIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon
    className="text-xl select-arrow-icon"
    component={SelectArrow}
    {...props}
  />
);
export default SelectArrowIcon;
