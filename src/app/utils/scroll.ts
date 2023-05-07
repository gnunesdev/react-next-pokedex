export const getIsScrollFinished = () => {
  const isFinished =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

  return isFinished;
};
