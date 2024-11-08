const DropDownLight = ({ isHoveringIcon }: { isHoveringIcon: boolean }) => {
  return (
    <div className={`${isHoveringIcon === true ? "dropdown-icon" : ""} `}>
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.2001 5.90601C7.63461 6.36466 8.36503 6.36466 8.79954 5.90601L13.936 0.484192C14.2209 0.183492 14.6956 0.170662 14.9963 0.455535C15.297 0.740409 15.3098 1.21511 15.0249 1.51581L9.88847 6.93763C8.86232 8.02079 7.13732 8.02079 6.11117 6.93763L0.974705 1.51581C0.689832 1.21511 0.702662 0.740409 1.00336 0.455535C1.30406 0.170662 1.77876 0.183492 2.06363 0.484191L7.2001 5.90601Z"
          fill="white"
          fill-opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default DropDownLight;
