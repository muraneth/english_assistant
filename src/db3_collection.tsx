import {
  createClient,
  createFromPrivateKey,
  syncAccountNonce,
  getCollection,
} from "db3.js";
import { Collection } from "db3.js/dist/store/types";

const STORAGE_NODE_URL = "https://rollup.cloud.db3.network";
const INDEX_NODE_URL = "https://index.cloud.db3.network";
const databaseAddr = "0x229cffa2bd83b98a3994dd6a7098e4c8c518ff2e";
const collectionName = "NewWords";
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
