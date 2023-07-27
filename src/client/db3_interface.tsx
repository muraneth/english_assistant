import { addDoc, queryDoc, updateDoc, deleteDoc } from "db3.js";
import { Collection } from "db3.js/dist/store/types";
import { useMemo } from "react";
import { DB3Client } from "./db3_client";
import { DocumentData } from "db3.js/dist/client/base";

const db3Client = new DB3Client();

export class DB3Interface {
  collection: Collection | undefined;

  async init() {
    this.collection = await db3Client.getWordListCollectionInstance();
  }

  async addData(doc: DocumentData) {
    if (this.collection) await addDoc(this.collection, doc);
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
      const eak = await chrome.storage.local.get(["English_Assistant_Key"]);

      const query = `/[addr = "${eak.English_Assistant_Key.address}"]`;
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
