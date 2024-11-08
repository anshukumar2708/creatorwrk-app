import { DatePicker, Form, Select } from "antd";
import SelectArrowIcon from "../../assets/images/common/selectarrow";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import DropDownArrow from "../../assets/images/svg/dropdown-arrow";
import dayjs from "dayjs";
import { handleDropdownVisibility } from "../../utils/helper";

const FeedFilter = () => {
  const { categories } = useSelector((state: State) => state);

  // Add category Data in Object for listing
  const categoryOptions = categories?.categories?.map((item) => ({
    label: item.name,
    value: item.name.toLowerCase(),
  }));

  const formSubmitHandler = (values: any) => {
    console.log(values);
  };

  return (
    <div className="bg-black flex flex-col justify-start items-start gap-3 rounded-18 p-6 border border-lightGrey w-300 min-w-300 min-h-351">
      <p className="text-mediumViolet font-medium text-base m-0 p-0">Filter</p>
      <div className="w-full">
        <Form
          autoComplete="off"
          onFinish={(values) => formSubmitHandler(values)}
          className="flex flex-col justify-center items-center gap-5 w-full"
        >
          <Form.Item
            name="location"
            className="w-full text-base"
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { required: true, message: "City is required" },
              {
                pattern: /^(?!\s+$).*$/,
                message: "Blank spaces are not allowed!",
              },
            ]}
          >
            <Select
              placeholder={
                <span className="text-base font-normal text-blue">
                  Location*
                </span>
              }
              size="large"
              className="select-container"
              options={[
                { value: "ahmedabad", label: "Ahmedabad" },
                { value: "surat", label: "Surat" },
                { value: "rajkot", label: "Rajkot" },
              ]}
              suffixIcon={<SelectArrowIcon />}
              onDropdownVisibleChange={handleDropdownVisibility}
            />
          </Form.Item>

          <Form.Item
            name="category"
            className="w-full text-base"
            validateTrigger={["onBlur", "onChange"]}
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select
              mode="multiple"
              size="large"
              className="select-container"
              placeholder={
                <span
                  style={{ padding: 0 }}
                  className="text-base font-normal text-blue"
                >
                  Category*
                </span>
              }
              style={{ width: "100%" }}
              options={categoryOptions}
              suffixIcon={<SelectArrowIcon />}
              onDropdownVisibleChange={handleDropdownVisibility}
            />
          </Form.Item>

          <Form.Item
            name="date"
            className="w-full text-base"
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              {
                required: true,
                message: "Date is required",
              },
              {
                pattern: /^(?!\s+$).*$/,
                message: "Blank spaces are not allowed!",
              },
            ]}
          >
            <DatePicker
              placeholder="Date*"
              size="large"
              className="text-base font-normal text-blue w-full"
              maxDate={dayjs()}
              style={{ color: "#8688A5" }}
              allowClear={false}
              suffixIcon={<DropDownArrow />}
              // onChange={(date, dateString) => {}}
              onOpenChange={handleDropdownVisibility}
            />
          </Form.Item>

          <div className="flex flex-col justify-center items-center w-full mt-5">
            <button className="bg-white w-226 h-49 rounded-500 font-semibold text-base text-black hover:shadow-white-button-shadow">
              Apply
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FeedFilter;
