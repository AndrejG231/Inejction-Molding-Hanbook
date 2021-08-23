export const getShift = (min: number) => {
  const time = new Date(min);
  let startTime = min;

  for (const t of [6, 14, 22]) {
    time.setHours(t);
    if (time.getTime() <= min) {
      startTime = time.getTime();
    }
  }

  const endTime = startTime + 8 * 60 * 60 * 1000;

  return { startTime, endTime };
};
