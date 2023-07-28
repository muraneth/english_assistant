import { DocumentData } from "db3.js/dist/client/base";
import logo from "../assets/icons/32.png";
import { DB3Interface } from "../client/db3_interface";
import { useEffect, useState } from "react";
import "./newtab.css";
import Record from "./record";

const Newtab = () => {
  const [records, setRecords] = useState(Array<DocumentData>);
  const [num, setNum] = useState(0);

  const db3Interface = new DB3Interface();

  useEffect(() => {
    async function loadData() {
      const re = await db3Interface.getData();
      setRecords(re!);
    }
    loadData();
  }, []);

  const updateData = async (id: string, record: DocumentData) => {
    await db3Interface.updateData(id, record);
  };

  return (
    <div>
      {/* <img src={logo} /> */}

      {records.length > num && (
        <Record
          record={records[num]}
          updateFunc={() => updateData("1", records[num])}
        />
      )}
      <button
        onClick={() => {
          setNum((n) => n + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};
export default Newtab;
