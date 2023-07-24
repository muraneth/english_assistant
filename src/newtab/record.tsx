import { DocumentData } from "db3.js/dist/client/base";
import { Link } from "react-router-dom";

interface Props {
  record: DocumentData;
  updateFunc: any;
}
const Record = ({ record, updateFunc }: Props) => {
  console.log(record);

  return (
    <>
      <h1>{record.word}</h1>
      <p>{record.gpt.sentence}</p>
      <p>{record.gpt.explanation}</p>
      <img src={record.gpt.pic_url}></img>

      <button onClick={updateFunc}> update</button>
    </>
  );
};
export default Record;
