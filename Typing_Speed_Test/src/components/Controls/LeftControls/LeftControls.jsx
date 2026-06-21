import { useContext } from "react";
import { TestContext } from "../../../context/TestContext/test-context.js";
import { SettingContext } from "../../../context/SettingContext/setting-context.js";

const LeftControls = () => {
  const { accuracy, elapsedSeconds, timeLeft, wpm } = useContext(TestContext);
  const { mode } = useContext(SettingContext);
  const displayedTime = mode === "60s" ? timeLeft : elapsedSeconds;

  return (
    <div className="flex justify-evenly gap-5 text-neutral-400 text-md lg:text-xl font-medium lg:px-2">
      <h2 className="lg:inline flex flex-col gap-2">
        WPM:{" "}
        <span className="text-neutral-50 text-2xl lg:text-xl font-bold">
          {wpm}
        </span>
      </h2>
      <h2 className="px-10 border-x-2 border-neutral-800 lg:inline flex flex-col gap-2">
        Accuracy:{" "}
        <span className="text-neutral-50 text-2xl lg:text-xl font-bold">
          {accuracy}%
        </span>
      </h2>
      <h2 className="lg:inline flex flex-col gap-2">
        Time:{" "}
        <span className="text-neutral-50 text-2xl lg:text-xl font-bold">
          0:{String(displayedTime).padStart(2, "0")}
        </span>
      </h2>
    </div>
  );
};

export default LeftControls;
