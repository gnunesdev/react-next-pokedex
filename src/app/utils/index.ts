export const getIsScrollFinished = () => {
  const is =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

  console.log(is);
};
