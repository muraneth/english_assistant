import {
  createClient,
  createFromPrivateKey,
  syncAccountNonce,
  getCollection,
  createCollection,
  getDatabase,
  createDocumentDatabase,
  DB3Account,
  Client,
} from "db3.js";

import { Collection, Database } from "db3.js/dist/store/types";
import { getLocalAccount } from "./account";

const STORAGE_NODE_URL = "https://rollup.cloud.db3.network";
const INDEX_NODE_URL = "https://index.cloud.db3.network";

const DB_DESCRIPTION = "DrawordsDB";

const COLLECTION_NAME = "WordsList";
const DB_ADDRESS = "DrawordDBAddress";

export class DB3Client {
  wordListCollection: Collection | undefined;

  async initClient(privateKey: `0x{string}`): Promise<Client> {
    const account = createFromPrivateKey(privateKey);
    const clientIns = createClient(STORAGE_NODE_URL, INDEX_NODE_URL, account);
    await syncAccountNonce(clientIns);
    return clientIns;
  }

  async createWordListDBAndCollection(): Promise<Collection | undefined> {
    const localAccount = await getLocalAccount();
    console.log("start create db with account ", localAccount);

    if (localAccount) {
      const client = await this.initClient(localAccount.privateKey!);
      const { db } = await createDocumentDatabase(client, DB_DESCRIPTION);
      let col = await createCollection(db, COLLECTION_NAME);
      chrome.storage.local.set({ DrawordDBAddress: db.addr });
      return col.collection;
    } else {
      console.log("create db but  no local account");
    }
  }

  async getLocalDBAddress(): Promise<string | undefined> {
    const stg = await chrome.storage.local.get([DB_ADDRESS]);

    return stg.DrawordDBAddress;
  }

  async getWordListCollectionInstance(): Promise<Collection | undefined> {
    if (!this.wordListCollection) {
      const localAccount = await getLocalAccount();
      const localAddress = await this.getLocalDBAddress();

      if (localAccount) {
        const cli = await this.initClient(localAccount.privateKey!);

        this.wordListCollection = await getCollection(
          localAddress!,
          COLLECTION_NAME,
          cli
        );
        console.log("this.wordListCollection ", this.wordListCollection);
      } else {
        console.log("getWordListCollectionInstance but no local account");
      }
    }
    return this.wordListCollection;
  }
}
