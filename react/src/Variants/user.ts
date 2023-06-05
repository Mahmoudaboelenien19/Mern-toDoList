export const avatarVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1 } },
};

export const overleyVariant = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    background: " var(--overley)",
    transition: { duration: 0.5, when: "beforeChildren", delayChildren: 0.5 },
  },
  exit: { opacity: 0, transition: { duration: 0.5, when: "afterChildren" } },
};
