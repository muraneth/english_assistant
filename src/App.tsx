import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  // function settings() {
  //   let internalUrl = chrome.runtime.getURL("settings.html");
  //   chrome.tabs.create({ url: internalUrl });
  // }
  const [openAIToken, setOpenAIToken] = useState("");
  const [nativeLangurage, setNativeLangurage] = useState("en-US");
  const [interestedArea, setInterestedArea] = useState("");

  const changeOpenAIToken = useCallback(async (newToken: string) => {
    console.log("newToken", newToken);
    await chrome.storage.local.set({ openAIToken: newToken });
  }, []);
  const changeInterestingArea = useCallback(async (area: string) => {
    console.log("area", area);
    await chrome.storage.local.set({ interestedArea: area });
  }, []);

  useEffect(() => {
    chrome.storage.local
      .get(["nativeLangurage", "openAIToken", "area"])
      .then((state) => {
        if (state["nativeLangurage"]) {
          setNativeLangurage(state["nativeLangurage"]);
        }
        if (state["openAIToken"]) {
          setOpenAIToken(state["openAIToken"]);
        }
        if (state["interestedArea"]) {
          setInterestedArea(state["interestedArea"]);
        }
      });
  }, []);

  return (
    <div className="App">
      <h1>TweetGPT Settings</h1>

      <h2>OpenAI API Token </h2>

      <div>
        Required. You can find your Secret API key in your{" "}
        <a href="https://platform.openai.com/account/api-keys">
          OpenAI User settings
        </a>
      </div>

      <input
        type="password"
        placeholder="Put your secret API token here"
        onChange={(e) => changeOpenAIToken(e.target.value)}
      />
      <input
        placeholder="Interesting area"
        onChange={(e) => changeInterestingArea(e.target.value)}
      />
    </div>
  );
}

export default App;
