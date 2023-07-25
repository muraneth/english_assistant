import { DocumentData } from "db3.js/dist/client/base";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  record: DocumentData;
  updateFunc: any;
}
const Record = ({ record, updateFunc }: Props) => {
  console.log(record);

  return (
    <Card sx={{ maxWidth: 512 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {record.word}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {record.gpt.explanation}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 512 }}
        image={record.gpt.pic_url}
        title="green iguana"
      />
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
export default Record;
