export const avatarVariant = {
  start: { x: 0 },
  end: { x: 0 },
  exit: { y: "-100vw", transition: { duration: 1 } },
};

export const overleyVariant = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    background: " rgba(255, 166, 0, 0.38)",
    transition: { duration: 1, when: "beforeChildren", delayChildren: 0.5 },
  },
  exit: { opacity: 0, transition: { duration: 1, when: "afterChildren" } },
};
