const ChatIcon = ({ width = 20, height = 20 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 20" fill="none">
      <path
        d="M16.9033 6.85107L12.46 10.4641C11.6205 11.1301 10.4394 11.1301 9.59992 10.4641L5.11914 6.85107"
        stroke="#E4E6FF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.9089 19C18.9502 19.0084 21 16.5095 21 13.4384V6.57001C21 3.49883 18.9502 1 15.9089 1H6.09114C3.04979 1 1 3.49883 1 6.57001V13.4384C1 16.5095 3.04979 19.0084 6.09114 19H15.9089Z"
        stroke="#E4E6FF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ChatIcon;
