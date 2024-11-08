const MessageHoverIcon = ({ width = 20, height = 20 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 20" fill="none">
      <path
        d="M16.534 6.88574L12.3684 10.273C11.5814 10.8973 10.4741 10.8973 9.68706 10.273L5.48633 6.88574"
        stroke="url(#paint0_linear_5965_40121)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.6021 18.2754C18.4533 18.2832 20.375 15.9406 20.375 13.0614V6.62228C20.375 3.74304 18.4533 1.40039 15.6021 1.40039H6.39794C3.54667 1.40039 1.625 3.74304 1.625 6.62228V13.0614C1.625 15.9406 3.54667 18.2832 6.39794 18.2754H15.6021Z"
        stroke="url(#paint1_linear_5965_40121)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5965_40121"
          x1="2.34401"
          y1="3.0997"
          x2="3.94827"
          y2="12.7346"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8103FF" />
          <stop offset="0.44" stop-color="#EB03FF" />
          <stop offset="0.936493" stop-color="#F6B537" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5965_40121"
          x1="-3.06873"
          y1="-1.08987"
          x2="17.0955"
          y2="20.3773"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8103FF" />
          <stop offset="0.44" stop-color="#EB03FF" />
          <stop offset="0.838554" stop-color="#F6B537" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MessageHoverIcon;
