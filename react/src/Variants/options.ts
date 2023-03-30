export const optionVariant = {
  start: {
    opacity: 0,
  },

  end: {
    opacity: 0.4,
  },

  exit: {
    opacity: 0,
  },
};

export const hrVariant = {
  start: { width: 0 },
  end: {
    width: "80%",
  },
  exit: {
    width: 0,
  },
};

export const optionsParentVariant = {
  start: { height: 50 },
  end: {
    height: 50,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    height: 50,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.3,
      staggerDirection: -1,
      // repeatDelay: 5,
      delayChildren: 1,
    },
  },
};

export const opacityVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: {
    opacity: 0,
  },
};

export const clearBtn = {
  start: { opacity: 0, scale: 0.8 },
  end: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, duration: 0.4 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { delay: 0.2, duration: 0.4 } },
};
