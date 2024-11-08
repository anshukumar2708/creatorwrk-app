import { Tooltip } from "antd";

const ToolTip = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip
      title={
        <p className="text-white flex justify-center font-medium items-center text-sm leading-5">
          {title}
        </p>
      }
      color="#383949"
    >
      {children}
    </Tooltip>
  );
};

export default ToolTip;
