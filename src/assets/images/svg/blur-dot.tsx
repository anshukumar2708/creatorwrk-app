const BlurDot = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="74"
      fill="none"
      viewBox="0 0 74 74"
    >
      <circle
        cx="37"
        cy="37"
        r="37"
        fill="url(#paint0_radial_105_2531)"
      ></circle>
      <defs>
        <radialGradient
          id="paint0_radial_105_2531"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 0 37) scale(32.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D3D3D3" stopOpacity="0.9"></stop>
          <stop offset="0.625" stopColor="#979797" stopOpacity="0.28"></stop>
          <stop offset="1" stopColor="#767676" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
};

export default BlurDot;
