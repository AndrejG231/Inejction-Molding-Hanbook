export const getEditTime = () => {
  const time = new Date().getTime();

  return time - (time % 1800000);
};
