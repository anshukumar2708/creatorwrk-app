const DropDownDark = ({ isHoveringIcon }: { isHoveringIcon: boolean }) => {
  return (
    <div className={`${isHoveringIcon === true ? "dropdown-icon" : ""} `}>
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.2001 5.86915C7.63461 6.3278 8.36503 6.3278 8.79954 5.86915L13.936 0.447327C14.2209 0.146627 14.6956 0.133797 14.9963 0.41867C15.297 0.703544 15.3098 1.17824 15.0249 1.47894L9.88847 6.90077C8.86232 7.98392 7.13732 7.98392 6.11117 6.90077L0.974705 1.47894C0.689832 1.17824 0.702662 0.703543 1.00336 0.41867C1.30406 0.133797 1.77876 0.146627 2.06363 0.447326L7.2001 5.86915Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default DropDownDark;
