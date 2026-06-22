import { useAppContext } from "../context/AppContext.jsx";

export default function UploadPanel() {
  const {
    analyzeImage,
    error,
    handleFile,
    isAnalyzing,
    isDragging,
    setIsDragging,
    uploadInputRef,
    selectedFile,
  } = useAppContext();

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  }

  const isReadyToAnalyze = selectedFile && !isAnalyzing;

  return (
    <section
      className="flex w-full max-w-[672px] flex-col items-center gap-6 rounded-[28px] border-[3px] border-ink p-7 shadow-hard md:rounded-[48px] md:p-12"
      aria-label="Upload image"
    >
      <input
        ref={uploadInputRef}
        type="file"
        id="upload-image"
        accept="image/*"
        hidden
        onChange={(event) => handleFile(event.target.files[0])}
      />
      <label
        htmlFor="upload-image"
        className={`flex min-h-61 w-full flex-col items-center justify-center gap-2.5 rounded-3xl border-4 border-dashed border-[#d9c0c8] bg-[#f3f4f5] px-4 py-10 text-center transition md:px-6 md:py-14 ${
          isDragging ? "scale-[1.01] bg-[#ee459f1d]" : "hover:scale-[1.01] hover:bg-[#ee459f1d]"
        } ${selectedFile ? "border-primary bg-[#ee459f0f]" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <img
          className="mb-1.5 rounded-full border-[3px] border-ink bg-secondary p-[22px] transition group-hover:scale-105"
          src="/icons/Image-add.svg"
          alt=""
        />
        <strong className="text-lg">
          {selectedFile ? selectedFile.name : "Drag & Drop your masterpiece"}
        </strong>
        <span className="text-muted-text">
          {selectedFile ? "Click to change image" : "PNG, JPG or WebP (Max 10MB)"}
        </span>
      </label>
      
      {error && (
        <div className="w-full flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-[#ffe5ec] p-4 text-[#8b174f] shadow-hard-sm">
          <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-bold">{error}</p>
        </div>
      )}

      <button
        type="button"
        className={`flex w-full items-center justify-center gap-3 rounded-full border-[3px] border-ink px-6 py-4 font-bold text-white shadow-hard transition disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-hard ${
          isReadyToAnalyze 
            ? "bg-tertiary text-ink hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#1a1a1a] animate-pulse" 
            : "bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#1a1a1a]"
        }`}
        onClick={analyzeImage}
        disabled={isAnalyzing}
      >
        <img src="/icons/analyze.svg" alt="" className={isReadyToAnalyze ? "animate-bounce" : ""} />
        {isAnalyzing ? "Analyzing..." : isReadyToAnalyze ? "Ready to Analyze!" : "Analyze with AI"}
      </button>
    </section>
  );
}
