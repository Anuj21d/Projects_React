import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";
import { SettingContext } from "/src/context/SettingContext/SettingContext.jsx";

const OverlayLayer = () => {
  const { isStarted, setIsStarted, generatePassage, inputRef } =
    useContext(TestContext);
  const { difficulty } = useContext(SettingContext);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <button
        onClick={() => {
          setIsStarted(true);
          generatePassage(difficulty);
          inputRef.current.focus();
        }}
        className={`bg-blue-600 px-4 py-3 font-semibold text-xl rounded-xl text-neutral-50 flex items-center active:bg-blue-500 active:scale-90 ${isStarted ? "hidden" : ""}`}
      >
        Start Typing Test
      </button>
    </div>
  );
};

export default OverlayLayer;
