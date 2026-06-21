import { useContext } from "react";
import { TestContext } from "/src/context/TestContext/test-context.js";
import Logo from "../../assets/images/logo-large.svg";
import Trophy from "../../assets/images/icon-personal-best.svg";
import logosm from "../../assets/images/logo-small.svg";

const Header = () => {
  const { bestWpm } = useContext(TestContext);
  return (
    <div className="flex justify-between items-center lg:py-8 py-3">
      <img className="hidden lg:inline" src={Logo} alt="Logo Svg" />
      <img className="lg:hidden scale-95" src={logosm} alt="Logo" />
      <div className="flex items-center gap-2 text-neutral-400 lg:text-2xl font-medium">
        <img src={Trophy} alt="Trophy Logo" />
        <h2>
          <span className="hidden lg:inline">Personal </span> Best : <span className="text-neutral-50">{bestWpm} WPM</span>
        </h2>
      </div>
    </div>
  );
};

export default Header;
