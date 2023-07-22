import React from "react";
import "./App.css";

function App() {
  function setting() {
    let internalUrl = chrome.runtime.getURL("assets/settings.html");
    chrome.tabs.create({ url: internalUrl });
  }

  return (
    <div className="App">
      <a href="/setting" onClick={() => window.open("/setting", "_blank")}>
        New Page
      </a>
      Hello World
      <button onClick={setting}>setting </button>
    </div>
  );
}

export default App;
