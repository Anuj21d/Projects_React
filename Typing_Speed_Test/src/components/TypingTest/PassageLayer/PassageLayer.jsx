import React from "react";
import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";
import ResetButton from "./ResetButton";
import { useEffect } from "react";
import { SettingContext } from "/src/context/SettingContext/SettingContext.jsx";

const PassageLayer = () => {
  const { currentPassage, isStarted, generatePassage, typedText, data } =
    useContext(TestContext);
  const { difficulty } = useContext(SettingContext);
  useEffect(() => {
    generatePassage(difficulty);
  }, [difficulty]);

  const currentIndex = typedText.length;
  return (
    <div className="lg:p-8 ">
      <p
        className={`lg:text-4xl text-3xl leading-relaxed text-neutral-50 font-normal text-left ${
          isStarted ? "" : "blur-sm"
        }`}
      >
        {currentPassage?.text.split("").map((char, index) => (
          <span
            key={index}
            className={`${
              typedText[index] === undefined
                ? "text-neutral-500"
                : typedText[index] === char
                  ? "text-green-400"
                  : "text-red-400"
            }
              ${index === currentIndex ? "bg-neutral-500 rounded-md text-neutral-900 px-1" : ""}
                  `}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default PassageLayer;
