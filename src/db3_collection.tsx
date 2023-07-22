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

const STORAGE_NODE_URL = "https://rollup.cloud.db3.network";
const INDEX_NODE_URL = "https://index.cloud.db3.network";
const databaseAddr = "0x15a07a50d8a224d1bc2992b731178d3b4568cd99";
const collectionName = "Users";
const private_key =
  "0xd86f684c45a368c0006aa14ef9205235887577620a79cee6d46e5fb05e1870f4";
const account = createFromPrivateKey(private_key);

export class InitCollection {
  collection: Collection | undefined;
  async getTheCollection(): Promise<Collection | undefined> {
    if (!this.collection) {
      this.collection = await this.initCollection();
    }
    return this.collection;
  }
  async initCollection(): Promise<Collection | undefined> {
    console.log("get collection");
    let clientIns = createClient(STORAGE_NODE_URL, INDEX_NODE_URL, account);
    await syncAccountNonce(clientIns);
    let col = await getCollection(databaseAddr, collectionName, clientIns);
    return col;
  }
}
