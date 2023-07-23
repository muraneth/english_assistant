import { addDoc, queryDoc, deleteDoc } from "db3.js";
import { Collection } from "db3.js/dist/store/types";
import { useMemo } from "react";
import { InitCollection } from "./db3_collection";
import { DocumentData } from "db3.js/dist/client/base";

const coll = new InitCollection();

export class DB3Client {
  async addData(doc: DocumentData) {
    let collection = await coll.getTheCollection();

    if (collection) {
      await addDoc(collection, doc).then((re) => {
        console.log(re);
      });
    }
  }
  async getData(): Promise<Array<DocumentData>> {
    let collection = await coll.getTheCollection();
    console.log(collection);

    if (collection) {
      const query = "/*";
      await queryDoc(collection, query)
        .then((result) => {
          console.log(result);

          result.docs.map((element) => {
            console.log(element.doc);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    return [{}, {}];
  }
}
