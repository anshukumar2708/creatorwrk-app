import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";

interface IProps {
  searchHandler: any;
  inputFocus: any;
  setInputFocus: any;
}

const SearchInput = ({ searchHandler, inputFocus, setInputFocus }: IProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {" "}
      <div
        ref={targetRef}
        className={`w-full md:w-350 p-0.5 shadow-input-box ${
          inputFocus
            ? " bg-gradient-to-l from-teal-400 via-indigo-500 to-pink-500 rounded-4xl"
            : ""
        } `}
      >
        <div className="h-12 bg-black rounded-sm border border-lightGrey flex justify-start p-2.5 items-center gap-2.5">
          <SearchOutlined
            width={20}
            style={{
              color: "rgba(228, 230, 255, 1)",
              fontSize: "20px",
            }}
          />
          <input
            className="search-input"
            placeholder="Search"
            onChange={(e) => {
              searchHandler(e.target.value);
            }}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        </div>
      </div>
    </>
  );
};

export default SearchInput;
