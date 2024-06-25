import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { QuestionscontextProvider } from "./context/questionscontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuestionscontextProvider>
      <App />
    </QuestionscontextProvider>
  </React.StrictMode>
);
