import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Loader = (props: { note?: string }) => {
  console.log("Loader Component mounted : ", props?.note);
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 84 }} spin />} />
    </div>
  );
};

export default React.memo(Loader);
