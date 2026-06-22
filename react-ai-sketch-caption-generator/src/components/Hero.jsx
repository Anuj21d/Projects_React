import { useAppContext } from "../context/AppContext.jsx";

export default function Hero() {
  const { openUpload } = useAppContext();

  return (
    <section className="flex flex-col items-center text-center" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title" className="text-[32px] font-bold leading-[1.1] md:text-5xl">
          AI Image Caption{" "}
          <span className="inline-block border-b-[3px] border-secondary text-primary">
            Generator
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-[656px] leading-8 text-muted-text">
          Turn your beautiful artwork into descriptive text effortlessly. Built for creators
          who need the perfect words for their pixels.
        </p>
      </div>
      <button
        className="mt-8 flex items-center justify-center gap-3 rounded-[28px] border-[3px] border-ink bg-secondary px-10 py-4 font-bold text-[#715d00] shadow-[3px_3px_0_#1a1a1a] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard md:rounded-full"
        type="button"
        onClick={openUpload}
      >
        <img src="/icons/upload.svg" alt="" />
        Upload Artwork
      </button>
    </section>
  );
}
