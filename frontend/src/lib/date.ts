export const getCurrentKSTDate = () => {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  return date.toISOString().split('T')[0];
};
