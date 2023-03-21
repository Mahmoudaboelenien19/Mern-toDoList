export const btnHover = {
  boxShadow: "2px 2px 2px rgb(0,0,0) ",
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 5,
    mass: 2,
  },
};

export const taskbtnHover = {
  scale: 1.2,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 5,
    mass: 2,
  },
};

export const linkHover = {
  letterSpacing: "1px",
  transition: { type: "spring", stiffness: 300 },
};

export const popVariant = {
  start: { y: -1000, x: "-50%" },
  end: {
    y: "-50%",
    x: "-50%",
    transition: { delay: 0.5, type: "spring", stiffness: 150 },
  },
  exit: { y: "-100vh", transition: { type: "tween", duration: 1.4 } },
};
