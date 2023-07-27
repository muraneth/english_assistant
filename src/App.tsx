import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  function setting() {
    let internalUrl = chrome.runtime.getURL("js/setting.html");
    chrome.tabs.create({ url: internalUrl });
  }

  return (
    <div className="App">
      <h2>Drawords</h2>
      <button onClick={setting}> setting</button>
    </div>
  );
}

export default App;
