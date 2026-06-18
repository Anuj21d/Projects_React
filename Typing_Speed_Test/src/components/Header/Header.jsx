import React, { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";

const Header = () => {
  const { bestWpm } = useContext(TestContext);
  return (
    <div className="flex justify-between items-center py-8">
      <img src="/src/assets/images/logo-large.svg" alt="Logo Svg" />
      <div className="flex items-center gap-2 text-neutral-400 text-2xl font-medium">
        <img
          src="/src/assets/images/icon-personal-best.svg"
          alt="Trophy Logo"
        />
        <h2>
          Personal best : <span className="text-neutral-50">{bestWpm} WPM</span>
        </h2>
      </div>
    </div>
  );
};

export default Header;
