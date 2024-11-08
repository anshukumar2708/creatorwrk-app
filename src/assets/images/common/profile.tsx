import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
const Profile = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#8688A5"
      d="M15.25 6A3.25 3.25 0 0112 9.25v1.5A4.75 4.75 0 0016.75 6h-1.5zM12 9.25A3.25 3.25 0 018.75 6h-1.5A4.75 4.75 0 0012 10.75v-1.5zM8.75 6A3.25 3.25 0 0112 2.75v-1.5A4.75 4.75 0 007.25 6h1.5zM12 2.75A3.25 3.25 0 0115.25 6h1.5A4.75 4.75 0 0012 1.25v1.5zm-3 11h6v-1.5H9v1.5zm6 6.5H9v1.5h6v-1.5zm-6 0A3.25 3.25 0 015.75 17h-1.5A4.75 4.75 0 009 21.75v-1.5zM18.25 17A3.25 3.25 0 0115 20.25v1.5A4.75 4.75 0 0019.75 17h-1.5zM15 13.75A3.25 3.25 0 0118.25 17h1.5A4.75 4.75 0 0015 12.25v1.5zm-6-1.5A4.75 4.75 0 004.25 17h1.5A3.25 3.25 0 019 13.75v-1.5z"
    ></path>
  </svg>
);

const ProfileIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon className="text-xl select-arrow-icon" component={Profile} {...props} />
);
export default ProfileIcon;
