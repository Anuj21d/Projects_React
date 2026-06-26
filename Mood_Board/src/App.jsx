import React from "react";
import AnimatedBackground from "./components/Backgrounds/AnimatedBackground";
import { motion } from "motion/react";
import { container, fadeUp } from "./Animation/animation";
import {
  User,
  Calendar,
  Sun,
  Sparkles,
  Wind,
  Zap,
  CloudRain,
  Flame,
  Moon,
} from "lucide-react";

const App = () => {
  const moods = [
    {
      emoji: "😊",
      label: "Happy",
      icon: Sun,
      color: "#FE9A00",
    },
    {
      emoji: "😌",
      label: "Calm",
      icon: Wind,
      color: "#53EAFD",
    },
    {
      emoji: "🤩",
      label: "Excited",
      icon: Zap,
      color: "#FF00FF",
    },
    {
      emoji: "😢",
      label: "Sad",
      icon: CloudRain,
      color: "#708090",
    },
    {
      emoji: "😤",
      label: "Angry",
      icon: Flame,
      color: "#E60076",
    },
    {
      emoji: "😴",
      label: "Sleepy",
      icon: Moon,
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 min-h-dvh px-6 py-8 flex flex-col ">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-full max-w-3xl mx-auto flex items-center justify-between"
        >
          <span className="px-4 py-2 bg-white flex justify-center items-center rounded-full  text-[12px] gap-1.5 text-gray-600 shadow-2xs">
            <Calendar size={14} color="#FF00FF" />
            <span>Friday, June 26</span>
          </span>
          <span className="p-3 rounded-full bg-white shadow-2xs">
            <User size={16} color="#64748b" />
          </span>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "ease",
            }}
            className="flex flex-col gap-3 mb-12"
          >
            <h4 className="flex justify-center items-center gap-2 font-[800] tracking-widest text-[#FF00FF] text-[14px]">
              <Sparkles color="#FF00FF" size={20} /> MOODBOARD
              <Sparkles color="#FF00FF" size={20} />
            </h4>
            <h1 className="text-4xl text-center font-[800]">
              How are you feeling today?
            </h1>
            <p className="text-center text-slate-500">
              Pick your vibe and we'll set the stage.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-4 w-full"
          >
            {moods.map((mood) => {
              const Icon = mood.icon;

              return (
                <motion.button
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  key={mood.label}
                  className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-6 shadow-sm"
                >
                  <motion.span
                    whileHover={{
                      rotate: [-6, 6, 0],
                      scale: 1.15,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="text-4xl"
                  >
                    {mood.emoji}
                  </motion.span>
                  <span className="text-[12px] text-gray-600">
                    {mood.label}
                  </span>
                  <motion.div
                    whileHover={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                  >
                    <Icon color={mood.color} size={14} />
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-10 text-[12px] text-slate-500"
          >
            No judgement here. Just honesty ✨
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
