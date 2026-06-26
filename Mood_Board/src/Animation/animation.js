export const container = {
  hidden: {},

  show: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.09,
    },
  },
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};