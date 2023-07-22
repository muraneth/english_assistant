import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SettingsScreen } from "./settings/settings_screen";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "setting",
        element: <SettingsScreen />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);

// const root = document.createElement("div");
// root.className = "container";
// document.body.appendChild(root);
// const rootDiv = ReactDOM.createRoot(root);
// rootDiv.render(
//   // <RouterProvider router={router} />
//   <React.StrictMode>
//     {/* <App /> */}
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
