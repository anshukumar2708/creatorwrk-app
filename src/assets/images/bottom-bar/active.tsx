import React from "react";

const ActiveIcon = () => {
  return (
    <svg
      width={23}
      height={7.5}
      viewBox="0 0 13 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4654_1928)">
        <g filter="url(#filter0_di_4654_1928)">
          <path
            d="M12.5 0C12.5 0.6566 11.5 0.999999 11.1194 1.9134C10.8681 2.52 10.4998 3.0712 10.0355 3.5355C9.5712 3.9998 9.02 4.3681 8.4134 4.6194C7.8068 4.8707 7.1566 5 6.5 5C5.8434 5 5.1932 4.8707 4.5866 4.6194C3.98 4.3681 3.4288 3.9998 2.9645 3.5355C2.5002 3.0712 2.1319 2.52 1.8806 1.9134C1.5 0.999999 0.5 0.6566 0.5 0H6.5H12.5Z"
            fill="#6174FF"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_di_4654_1928"
          x={-45.5}
          y={-42}
          width={104}
          height={97}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={23} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.215686 0 0 0 0 0.964706 0 0 0 0 0.964706 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4654_1928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4654_1928"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={10} />
          <feGaussianBlur stdDeviation={3.5} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.31 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_4654_1928"
          />
        </filter>
        <clipPath id="clip0_4654_1928">
          <rect width={13} height={5} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ActiveIcon;
