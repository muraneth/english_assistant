import { addDoc, queryDoc, updateDoc, deleteDoc } from "db3.js";
import { Collection } from "db3.js/dist/store/types";
import { useMemo } from "react";
import { InitCollection } from "./db3_collection";
import { DocumentData } from "db3.js/dist/client/base";

const coll = new InitCollection();

export class DB3Client {
  async addData(doc: DocumentData) {
    let collection = await coll.getTheCollection();

    if (collection) {
      const eak = await chrome.storage.local.get(["English_Assistant_Key"]);

      await addDoc(collection, {
        ...doc,
        addr: eak.English_Assistant_Key.address,
      } as DocumentData);
    }
  }
  async updateData(id: string, doc: DocumentData) {
    let collection = await coll.getTheCollection();
    if (collection) {
      await updateDoc(collection, id, doc);
    }
  }
  async getData(): Promise<Array<DocumentData>> {
    let collection = await coll.getTheCollection();

    if (collection) {
      const eak = await chrome.storage.local.get(["English_Assistant_Key"]);

      const query = `/[addr = "${eak.English_Assistant_Key.address}"]`;
      console.log("query=>", query);

      const result = await queryDoc(collection, query);
      return result.docs.map((element) => {
        return element.doc!;
      });
    } else {
      return [];
    }
  }
}
