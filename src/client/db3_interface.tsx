import { addDoc, queryDoc, updateDoc, deleteDoc } from "db3.js";
import { Collection } from "db3.js/dist/store/types";
import { useMemo } from "react";
import { DB3Client } from "./db3_client";
import { DocumentData } from "db3.js/dist/client/base";
import { DRAWORDS_ACCOUNT } from "./account";

const db3Client = new DB3Client();

export class DB3Interface {
  collection: Collection | undefined;

  async init() {
    if (!this.collection) {
      this.collection = await db3Client.getWordListCollectionInstance();
      console.log("init collectin", this.collection);
    }
  }

  async addData(doc: DocumentData) {
    console.log("save word", doc);
    if (this.collection)
      addDoc(this.collection, doc).then((state) => {
        console.log("saved: ", state);
      });
  }
  async updateData(id: string, doc: DocumentData) {
    if (this.collection) await updateDoc(this.collection, id, doc);
  }

  async getData(): Promise<Array<DocumentData> | undefined> {
    const words_cached = await chrome.storage.local.get(["words_cached"]);

    if (!words_cached.words_cached) {
      console.log("no words_cached");

      return await this.getDataFromRemote();
    } else {
      console.log(" => words_cached", words_cached);
      this.getDataFromRemote();
      return words_cached.words_cached;
    }
  }

  async getDataFromRemote(): Promise<Array<DocumentData> | undefined> {
    let collection = await db3Client.getWordListCollectionInstance();
    if (collection) {
      const query = `/*`;
      console.log("query=>", query);
      const result = await queryDoc(collection, query);
      let re = result.docs.map((element) => {
        return element.doc!;
      });

      chrome.storage.local.set({ words_cached: re }).then(() => {
        console.log("words_cached is set", re);
      });
      return re;
    }
  }
}
