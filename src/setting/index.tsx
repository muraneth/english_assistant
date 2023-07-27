import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Setting } from "./setting";

const div = document.createElement("div");
div.className = "container";
document.body.appendChild(div);

ReactDOM.createRoot(div).render(
  <StrictMode>
    <Setting />
  </StrictMode>
);
