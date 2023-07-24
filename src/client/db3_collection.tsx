import {
  createClient,
  createFromPrivateKey,
  syncAccountNonce,
  getCollection,
  createCollection,
  getDatabase,
  createDocumentDatabase,
} from "db3.js";

import { Collection } from "db3.js/dist/store/types";

const STORAGE_NODE_URL = "https://rollup.cloud.db3.network";
const INDEX_NODE_URL = "https://index.cloud.db3.network";
const databaseAddr = "0x229cffa2bd83b98a3994dd6a7098e4c8c518ff2e";
const collectionName = "NewWords";
const private_key =
  "0xd86f684c45a368c0006aa14ef9205235887577620a79cee6d46e5fb05e1870f4";

interface Mywallet {
  address: string;
  mnemonic: string;
  privateKey: string;
}
export class InitCollection {
  collection: Collection | undefined;
  async getTheCollection(): Promise<Collection | undefined> {
    // const collectionCache = await chrome.storage.local.get(["collectionCache"]);
    // if (collectionCache) {
    //   this.collection = collectionCache.collectionCache;
    // }
    if (!this.collection) {
      this.collection = await this.initCollection();
    }
    return this.collection;
  }

  async initCollection(): Promise<Collection | undefined> {
    const eak = await chrome.storage.local.get(["English_Assistant_Key"]);
    const account = createFromPrivateKey(eak.English_Assistant_Key.privateKey);

    console.log("account=>", account);
    let clientIns = createClient(STORAGE_NODE_URL, INDEX_NODE_URL, account);

    const database = await getDatabase(databaseAddr, clientIns);
    let col = await getCollection(databaseAddr, collectionName, clientIns);
    await syncAccountNonce(clientIns);
    // const { db, result } = await createDocumentDatabase(
    //   clientIns,
    //   "Personal db"
    // );
    // console.log("database=>", db);

    // let col = await createCollection(
    //   db,
    //   "collection-" + pk.English_Assistant_Key.address
    // );
    // console.log("col=>", col);

    // chrome.storage.local.set({ collectionCache: col }).then(() => {
    //   console.log("collection is set");
    // });

    return col;
  }

  initAccount(): Mywallet {
    console.log("init account");
    const ethers = require("ethers");
    const wallet = ethers.Wallet.createRandom();
    console.log("address:", wallet.address);
    console.log("mnemonic:", wallet.mnemonic.phrase);
    console.log("privateKey:", wallet.privateKey);
    return {
      address: wallet.address,
      mnemonic: wallet.mnemonic.phrase,
      privateKey: wallet.privateKey,
    };
  }
}
