import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SettingsProvider from "./context/SettingContext/SettingContext.jsx";
import { TestProvider } from "./context/TestContext/TestContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SettingsProvider>
      <TestProvider>
        <App />
      </TestProvider>
    </SettingsProvider>
  </BrowserRouter>,
);
