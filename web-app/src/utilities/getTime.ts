export const getTime = () => {
  const time: any = new Date().toLocaleTimeString().split(":");
  time[1] = ~~time[1] >= 30 ? 30 : 0;
  return ~~time[0] * 60 + time[1];
};
