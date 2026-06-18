import React, { useContext } from "react";
import { TestContext } from "/src/context/TestContext/TestContext.jsx";
import Logo from '../../assets/images/logo-large.svg'
import Trophy from '../../assets/images/icon-personal-best.svg'

const Header = () => {
  const { bestWpm } = useContext(TestContext);
  return (
    <div className="flex justify-between items-center py-8">
      <img src={Logo} alt="Logo Svg" />
      <div className="flex items-center gap-2 text-neutral-400 text-2xl font-medium">
        <img
          src={Trophy}
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
