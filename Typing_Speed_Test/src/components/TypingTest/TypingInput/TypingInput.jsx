import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/test-context.js";

const TypingInput = () => {
  const {
    currentPassage,
    inputRef,
    isFinished,
    isStarted,
    setIsFinished,
    setTypedText,
    typedText,
  } = useContext(TestContext);

  const handleChange = (e) => {
    if (!isStarted || isFinished || !currentPassage) return;

    const nextText = e.target.value.slice(0, currentPassage.text.length);

    setTypedText(nextText);

    if (nextText.length >= currentPassage.text.length) {
      setIsFinished(true);
    }
  };

  return (
    <div>
      <textarea
        ref={inputRef}
        value={typedText}
        onChange={handleChange}
        className="absolute opacity-0 inset-0"
      />
    </div>
  );
};

export default TypingInput;
