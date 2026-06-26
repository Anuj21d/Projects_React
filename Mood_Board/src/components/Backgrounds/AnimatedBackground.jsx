import { motion } from "motion/react";

const blobs = [
  {
    color: "#D9C5FF",
    className: `
      -top-32 -left-32 w-72 h-72 blur-[70px]
      md:-top-48 md:-left-48 md:w-[34rem] md:h-[34rem] md:blur-[100px]
      lg:-top-72 lg:-left-72 lg:w-[60rem] lg:h-[60rem] lg:blur-[140px]
    `,
    animate: {
      x: [0, 100, 0],
      y: [0, 60, 0],
      scale: [1, 1.08, 1],
    },
    duration: 18,
  },

  {
    color: "#FFC2E8",
    className: `
      -top-24 -right-24 w-72 h-72 blur-[70px]
      md:-top-40 md:-right-40 md:w-[32rem] md:h-[32rem] md:blur-[100px]
      lg:-top-56 lg:-right-56 lg:w-[55rem] lg:h-[55rem] lg:blur-[140px]
    `,
    animate: {
      x: [0, -90, 0],
      y: [0, 80, 0],
      scale: [1, 1.05, 1],
    },
    duration: 22,
  },

  {
    color: "#FFD4AE",
    className: `
      -bottom-24 -left-20 w-72 h-72 blur-[70px]
      md:-bottom-40 md:-left-28 md:w-[32rem] md:h-[32rem] md:blur-[100px]
      lg:-bottom-60 lg:-left-44 lg:w-[55rem] lg:h-[55rem] lg:blur-[140px]
    `,
    animate: {
      x: [0, 80, 0],
      y: [0, -70, 0],
      scale: [1, 1.06, 1],
    },
    duration: 20,
  },

  {
    color: "#FFE38B",
    className: `
      -bottom-32 -right-20 w-80 h-80 blur-[70px]
      md:-bottom-48 md:-right-32 md:w-[34rem] md:h-[34rem] md:blur-[100px]
      lg:-bottom-72 lg:-right-56 lg:w-[60rem] lg:h-[60rem] lg:blur-[140px]
    `,
    animate: {
      x: [0, -70, 0],
      y: [0, -60, 0],
      scale: [1, 1.08, 1],
    },
    duration: 24,
  },
];

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#FAF8FC]">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className={`absolute rounded-full opacity-85 ${blob.className}`}
          style={{
            backgroundColor: blob.color,
          }}
        />
      ))}
    </div>
  );
}