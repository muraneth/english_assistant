import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { SettingsScreen } from "./settings_screen";

// const root = createRoot(
//     document.getElementById('root')!
// );

// root.render(<SettingsScreen />);

const root = document.createElement("div");
root.className = "container";
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <SettingsScreen />
  </React.StrictMode>
);
