export const formVariants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: { delay: 1.5, type: "tween", when: "beforeChildren" },
  },
};

export const formTitle = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { delay: 0.2, duration: 0.2 } },
};

export const btnFormAnimation = {
  start: { x: 400 },
  end: {
    x: 0,
    transition: { delay: 1, duration: 0.2, type: "spring", stiffness: 200 },
  },
};

export const linkFormAnimation = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: { delay: 1.5, duration: 0.4, type: "tween" },
  },
};
interface inpVariantInterface {
  isFocus: boolean;
  isResetSpanCLicked?: boolean;
  isXSpanAnimateCompleted?: boolean;
  bg: string;
}

export const inpVariant = {
  start: ({ isFocus }: inpVariantInterface) => ({
    height: isFocus ? 3 : 40,
    initial: false,
  }),
  end: ({
    isFocus,
    isResetSpanCLicked,
    isXSpanAnimateCompleted,
    bg,
  }: inpVariantInterface) => ({
    height: isFocus ? 40 : 3,
    transition: {
      duration: 0.4,
      delay: isResetSpanCLicked || isXSpanAnimateCompleted ? 2 : 0.4,
      when: "beforeChildren",
      ease: "easeInOut",
    },
  }),
};

export const ResetSpanVariant = {
  start: { width: 0 },
  end: {
    width: 30,
    transition: {
      width: {
        delay: 0.5,
        duration: 0.4,
      },
      when: "beforeChildren",
    },
  },
  exit: {
    width: 0,
    transition: { delay: 0.55, duration: 0.4, when: "afterChildren" },
  },
};

export const xSpanVariant = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { delay: 0.2, duration: 0.2 } },
  exit: {
    opacity: 0,
    transition: { delay: 0.6, duration: 0.4 },
  },
};

export const hidePasswordVariant = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { delay: 0.2, duration: 0.2 } },
  exit: { opacity: 0, transition: { delay: 0.2, duration: 0.2 } },
};

export const placeholderVariant = {
  start: (bool: boolean) => ({
    scale: bool ? 1 : 0.8,
    color: bool ? "rgb(0,0,0)" : "var(--border)",
  }),
  end: (bool: boolean) => ({
    scale: bool ? 0.8 : 1,
    color: bool ? "var(--border)" : "rgb(0,0,0)",
    transition: { delay: 0.2, duration: 0.4 },
    originX: 0,
  }),
  // exit: { opacity: 0, transition: { delay: 0.4, duration: 0.2 } },
};

export const formPlaceholderVariant = {
  ...placeholderVariant,
  start: (bool: boolean) => ({
    scale: 0.8,
    color: bool ? "rgb(0,0,0)" : "var(--border)",
  }),
  end: (bool: boolean) => ({
    scale: bool ? 0.8 : 1,
    color: bool ? "var(--border)" : "rgb(0,0,0)",
    originX: 0,
    transition: { duration: 0.4, delay: 1, when: "beforeChildren" },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0, when: "afterChildren" },
  },
};

export const dotsParent = {
  start: {},
  end: { transition: { staggerChildren: 0.1, delayChildren: 1 } },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};
