import { ChatGPTClient, WordProps } from "./client/chat_gpt_client";
import { DB3Interface } from "./client/db3_interface";
import { DB3Client } from "./client/db3_client";

import { DRAWORDS_ACCOUNT } from "./client/account";

import { initAccount } from "./client/account";

const gptChat = new ChatGPTClient();

const db3Client = new DB3Client();

const db3Interface = new DB3Interface();

chrome.contextMenus.onClicked.addListener(async (info) => {
  console.log("2=>", info);
  var word = info.selectionText;
  const result = await chrome.storage.local.get("interestedArea");

  if (word && word.length > 0) {
    gptChat
      .askGPT({ word: word, interestedArea: result["interestedArea"] })
      .then((re) => {
        db3Interface.addData({
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
chrome.runtime.onInstalled.addListener(async function () {
  // Create one test item for each context type.

  chrome.contextMenus.create({
    title: "Save word",
    id: "saveword",
    type: "normal",
    contexts: ["selection"],
  });

  const eak = await chrome.storage.local.get([DRAWORDS_ACCOUNT]);

  if (!eak.PicWords_Account) {
    await initAccount();
    let internalUrl = chrome.runtime.getURL("js/setting.html");
    chrome.tabs.create({ url: internalUrl });
  }
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
