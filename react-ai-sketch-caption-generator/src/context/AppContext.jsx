import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const AppContext = createContext(null);

const STORAGE_KEY = "capmesketch-state";
const API_URL = "http://localhost:8787";

const defaultResult = {
  caption:
    '"A vibrant explosion of digital blossoms where every petal tells a story of spring. This whimsical garden captures the essence of a sun-drenched afternoon in a world of pure imagination."',
  style: "Digital Watercolor, Whimsical Illustration",
  hashtags: ["#VibrantFlora", "#WhimsicalDesign", "#ModernVibe"],
  previewUrl: "/images/jei-lee-0lL6Sox7n1Y-unsplash.jpg",
};

function loadStoredState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored) {
      if (stored.previewUrl && stored.previewUrl.startsWith("blob:")) {
        // Blob URLs don't survive page reloads, so revert to default
        return defaultResult;
      }
      return { ...defaultResult, ...stored };
    }
    return defaultResult;
  } catch {
    return defaultResult;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
}

function getHashtags(text) {
  return text.match(/#\w+/g) ?? [];
}

function getStyle(text) {
  const styleMatch = text.match(/Style:\s*(.*)/i);
  return styleMatch?.[1]?.trim() || "Style details were not included.";
}

export function AppProvider({ children }) {
  const uploadInputRef = useRef(null);
  const [activeNav, setActiveNav] = useState("Model");
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(loadStoredState);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { caption, style, hashtags, previewUrl } = result;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ caption, style, hashtags, previewUrl }),
    );
  }, [result]);

  useEffect(() => {
    return () => {
      if (result.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(result.previewUrl);
      }
    };
  }, [result.previewUrl]);

  function openUpload() {
    uploadInputRef.current?.click();
  }

  function handleFile(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Please choose an image under 10MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setError("");
    setResult({
      caption: "Image uploaded successfully.",
      style: "Waiting for analysis...",
      hashtags: ["Ready"],
      previewUrl,
    });
  }

  async function analyzeImage() {
    if (isAnalyzing) return;

    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult((current) => ({
      ...current,
      caption: "Analyzing image...",
      style: "Detecting style...",
      hashtags: ["Loading..."],
    }));

    try {
      const image = await fileToBase64(selectedFile);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          mimeType: selectedFile.type,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "The AI service could not analyze this image.");
      }

      const caption = data.result;
      setResult((current) => ({
        ...current,
        caption,
        hashtags: getHashtags(caption),
        style: getStyle(caption),
      }));
    } catch (analyzeError) {
      setError(analyzeError.message || "Something went wrong.");
      setResult((current) => ({
        ...current,
        caption: "Something went wrong.",
        style: "Analysis unavailable.",
        hashtags: ["TryAgain"],
      }));
    } finally {
      setIsAnalyzing(false);
    }
  }

  const value = useMemo(
    () => ({
      activeNav,
      analyzeImage,
      error,
      handleFile,
      isAnalyzing,
      isDragging,
      openUpload,
      result,
      selectedFile,
      setActiveNav,
      setIsDragging,
      uploadInputRef,
    }),
    [activeNav, error, isAnalyzing, isDragging, result, selectedFile],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider.");
  }

  return context;
}
