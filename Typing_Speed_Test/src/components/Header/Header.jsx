import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-8">
      <img src="/src/assets/images/logo-large.svg" alt="Logo Svg" />
      <div className="flex items-center gap-2 text-neutral-400 text-2xl font-medium">
        <img
          src="/src/assets/images/icon-personal-best.svg"
          alt="Trophy Logo"
        />
        <h2>
          Personal best : <span className="text-neutral-50">92 WPM</span>
        </h2>
      </div>
    </div>
  );
};

export default Header;
