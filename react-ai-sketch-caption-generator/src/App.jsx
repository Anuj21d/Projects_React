import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Results from "./components/Results.jsx";
import Superpowers from "./components/Superpowers.jsx";
import UploadPanel from "./components/UploadPanel.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col items-center gap-14 px-5 py-14 md:gap-20 md:px-10 md:py-20">
        <Hero />
        <UploadPanel />
        <Results />
        <Superpowers />
      </main>
      <Footer />
    </>
  );
}
