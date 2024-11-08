export const debounce = (func: Function, wait = 500) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const profileProgressBar = (data: any) => {
  const profileFields = [
    "name",
    "email",
    "profileImageUri",
    "city",
    "state",
    "country",
    "about",
    "dateOfBirth",
    "gender",
    "phoneNumber",
  ];
  const progress = profileFields.reduce(
    (acc, field) => acc + (data?.[field] ? 10 : 0),
    0
  );
  return progress;
};

export const handleDropdownVisibility = (open: boolean) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
};

export const capitalizeFirstWord = (sentence: string | null | undefined) => {
  if (!sentence) return sentence;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};
