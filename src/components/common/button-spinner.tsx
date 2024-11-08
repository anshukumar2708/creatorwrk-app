import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ButtonSpinner = ({ loading }: { loading?: boolean }) => {
  return (
    <>
      {" "}
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: "22px",
              marginRight: "12px",
            }}
            spin
          />
        }
      />
    </>
  );
};

export default ButtonSpinner;
