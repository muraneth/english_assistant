import { ChatGPTClient, TweetProps } from "./chat_gpt_client";
import { DB3Client } from "./db3_client";

const gptChat = new ChatGPTClient();

const db3Client = new DB3Client();

type Message = {
  type: "generate_tweet";
  props: TweetProps;
};

chrome.contextMenus.onClicked.addListener((info) => {
  console.log("2=>", info);
  info.selectionText;

  // const ms: TweetProps = { type: "happy", locale: "English", topic: " love " };
  // gptChat.generateTweet(ms).then(async (text) => {
  //   console.log(text);
  // });
  db3Client.getData();
});

// A generic onclick callback function.
// function genericOnClick(info) {}
chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  chrome.contextMenus.create({
    title: "Do ChatGPT - 2",
    id: "chatgpt",
    type: "normal",
    contexts: ["selection"],
  });
});
