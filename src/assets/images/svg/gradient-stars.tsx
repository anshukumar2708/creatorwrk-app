import React from "react";

const GradientStars = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      // fill="#paint0_linear_709_9698"
      viewBox="0 0 16 16"
    >
      <path
        fill="url(#paint0_linear_709_96988)"
        d="M11.946 9.546a.734.734 0 00-.213.647l.593 3.28a.72.72 0 01-.3.72.734.734 0 01-.78.053l-2.953-1.54a.753.753 0 00-.333-.087h-.181a.54.54 0 00-.18.06l-2.953 1.547c-.146.074-.312.1-.474.074a.74.74 0 01-.593-.848l.593-3.28a.746.746 0 00-.212-.652L1.552 7.187a.72.72 0 01-.18-.754.749.749 0 01.594-.5l3.313-.48a.741.741 0 00.587-.407l1.46-2.993a.694.694 0 01.133-.18l.06-.046a.448.448 0 01.107-.087l.073-.027.113-.046h.28c.252.025.472.175.588.4l1.479 2.98a.74.74 0 00.553.405l3.314.481c.28.04.514.234.606.5a.724.724 0 01-.193.753l-2.493 2.36z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_709_96988"
          x1="1.717"
          x2="3.05"
          y1="2.314"
          y2="15.724"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2AEBEB"></stop>
          <stop offset="0.45" stopColor="#6174FF"></stop>
          <stop offset="0.75" stopColor="#B63CFB"></stop>
          <stop offset="1" stopColor="#FF47E3"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GradientStars;
