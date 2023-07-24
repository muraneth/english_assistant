import { ChatGPTClient, WordProps } from "./client/chat_gpt_client";
import { DB3Client } from "./client/db3_client";
import { InitCollection } from "./client/db3_collection";

const gptChat = new ChatGPTClient();

const db3Client = new DB3Client();

const coll = new InitCollection();

chrome.contextMenus.onClicked.addListener((info) => {
  console.log("2=>", info);
  var word = info.selectionText;

  if (word && word.length > 0) {
    gptChat.askGPT({ word: word }).then((re) => {
      db3Client.addData({
        pageUrl: info.pageUrl,
        type: info.menuItemId,
        word: info.selectionText,
        gpt: re,
      });
    });
  }
});

// A generic onclick callback function.
// function genericOnClick(info) {}
chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.

  const acc = coll.initAccount();

  chrome.storage.local.set({ English_Assistant_Key: acc }).then(() => {
    console.log("Value is set");
    chrome.contextMenus.create({
      title: "Save word",
      id: "saveword",
      type: "normal",
      contexts: ["selection"],
    });
    // chrome.contextMenus.create({
    //   title: "Easy",
    //   id: "easy",
    //   type: "normal",
    //   parentId: "saveword",
    //   contexts: ["selection"],
    // });
    // chrome.contextMenus.create({
    //   title: "Hard",
    //   id: "hard",
    //   type: "normal",
    //   parentId: "saveword",
    //   contexts: ["selection"],
    // });
  });
});
