export const dropDownVariant = {
  start: {
    zIndex: 100,
    y: -300,
    x: "-50%",
  },
  end: { y: 0, x: "-50%", transition: { delay: 0.4 } },
  exit: {
    zIndex: 100,
    y: -250,
    x: "-50%",
    transition: { duration: 0.5 },
  },
};
