import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const navItems = ["Model", "API", "Pricing", "ShowCase"];

export default function Navbar() {
  const { activeNav, setActiveNav } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex min-h-21 items-center border-b-4 border-ink px-5 shadow-hard md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between py-5 md:flex-row md:items-center md:py-0">
        <div className="flex w-full items-center justify-between md:w-auto">
          <h1 className="whitespace-nowrap text-[28px] font-bold text-primary">CapMeSketch</h1>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-8 w-8 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden items-center justify-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item}>
              <button
                className={`border-b-[3px] px-0 py-2 transition-colors ${
                  activeNav === item
                    ? "border-primary text-primary"
                    : "border-transparent text-ink hover:border-primary hover:text-primary"
                }`}
                type="button"
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <ul className="mt-4 flex w-full flex-col gap-2 border-t-2 border-ink pt-4 md:hidden">
            {navItems.map((item) => (
              <li key={item} className="w-full text-center">
                <button
                  className={`block w-full border-b-[3px] py-2 transition-colors font-bold ${
                    activeNav === item
                      ? "border-primary bg-primary-bright/10 text-primary"
                      : "border-transparent text-ink hover:border-primary hover:bg-surface hover:text-primary"
                  }`}
                  type="button"
                  onClick={() => {
                    setActiveNav(item);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
