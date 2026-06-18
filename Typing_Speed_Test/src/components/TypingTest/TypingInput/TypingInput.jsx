import React from "react";
import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";

const TypingInput = () => {
  const { typedText, setTypedText , inputRef } = useContext(TestContext);
  return (
    <div>
      <textarea
        ref={inputRef}
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        className="absolute opacity-0 inset-0"
      />
    </div>
  );
};

export default TypingInput;
