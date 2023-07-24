import { DocumentData } from "db3.js/dist/client/base";
import logo from "../assets/icons/32.png";
import { DB3Client } from "../client/db3_client";
import { useEffect, useState } from "react";
import "./newtab.css";
import Word from "./record";
import Record from "./record";

const Newtab = () => {
  const [records, setRecords] = useState(Array<DocumentData>);

  const db3Client = new DB3Client();

  useEffect(() => {
    async function loadData() {
      const re = await db3Client.getData();
      setRecords(re);
    }
    loadData();
  }, []);

  const updateData = async (id: string, record: DocumentData) => {
    await db3Client.updateData(id, record);
  };

  return (
    <div>
      <img src={logo} />
      <h1>{records.length}</h1>

      {records &&
        records.map((e) => (
          <Record record={e} updateFunc={() => updateData("1", e)} />
        ))}
    </div>
  );
};
export default Newtab;
