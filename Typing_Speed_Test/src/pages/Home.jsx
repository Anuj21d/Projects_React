import { useContext, useEffect } from "react";
import Controls from "../components/Controls/Controls";
import TypingTest from "../components/TypingTest/TypingTest";
import ResetButton from "../components/TypingTest/PassageLayer/ResetButton";
import { TestContext } from "../context/TestContext/test-context.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { isFinished } = useContext(TestContext);

  useEffect(() => {
    if (isFinished) {
      navigate("/results");
    }
  }, [isFinished, navigate]);

  return (
    <div>
      <Controls />
      <TypingTest />
      <ResetButton />
    </div>
  );
};

export default Home;
