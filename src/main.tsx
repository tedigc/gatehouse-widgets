import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("gatehouse-widget")!;

console.log(root);

const id = root.getAttribute("gate-id") || "";

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App id={id} />
  </React.StrictMode>
);
