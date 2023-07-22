import {
  Client,
  createClient,
  createFromPrivateKey,
  syncAccountNonce,
  getCollection,
  addDoc,
  queryDoc,
  deleteDoc,
  createFromExternal,
} from "db3.js";
import { Collection } from "db3.js/dist/store/types";
import { useMemo } from "react";
import { InitCollection } from "./db3_collection";

const STORAGE_NODE_URL = "https://rollup.cloud.db3.network";
const INDEX_NODE_URL = "https://index.cloud.db3.network";
const databaseAddr = "0x15a07a50d8a224d1bc2992b731178d3b4568cd99";
const collectionName = "Users";
const private_key =
  "0xd86f684c45a368c0006aa14ef9205235887577620a79cee6d46e5fb05e1870f4";
const account = createFromPrivateKey(private_key);
const coll = new InitCollection();

export class DB3Client {
  async addData() {
    let collection = await coll.getTheCollection();
    if (collection) {
    }
  }
  async getData(): Promise<string | undefined> {
    let collection = await coll.getTheCollection();
    console.log(collection);

    if (collection) {
      const query = "/*";
      (await queryDoc(collection, query)).docs.map((element) => {
        console.log(element);
      });
    }
    return;
  }
}
