import { useAppContext } from "../context/AppContext.jsx";

export default function Results() {
  const { result } = useAppContext();
  const hashtags = result.hashtags.length ? result.hashtags : ["NoTagsYet"];

  return (
    <section className="flex w-full flex-col gap-12" aria-labelledby="result-title">
      <p className="text-center text-[28px] font-bold" id="result-title">
        The Magic Result
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,548px)_1fr]">
        <div className="w-full">
          <img
            className="aspect-square w-full rounded-[28px] border-[3px] border-ink object-cover shadow-hard md:rounded-[50px]"
            src={result.previewUrl}
            alt="Selected artwork preview"
          />
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-2 rounded-[28px] border-[3px] border-ink bg-primary-bright p-6 leading-7 shadow-hard md:rounded-[36px]">
            <p className="font-bold">PERFECT CAPTION</p>
            <p className="leading-7 break-words">{result.caption}</p>
          </div>
          <div className="rounded-[28px] border-[3px] border-ink bg-tertiary p-6 shadow-hard md:rounded-[36px]">
            <p className="font-bold">SMART HASHTAGS</p>
            <div className="mt-2.5 flex flex-wrap gap-2 md:gap-3">
              {hashtags.map((tag) => (
                <span
                  className="rounded-full border-[3px] border-ink bg-surface px-3 py-1 font-bold text-[#004661] text-sm md:text-base break-all"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border-[3px] border-ink bg-[#c4e7ff] p-6 shadow-hard md:rounded-[36px]">
            <p className="font-bold text-[#004661]">ART STYLE</p>
            <div className="mt-2.5 flex items-center gap-4">
              <img src="/icons/item2.svg" alt="" className="h-8 w-8 shrink-0" />
              <h4 className="text-lg md:text-xl font-bold leading-snug">{result.style || "Not specified"}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
