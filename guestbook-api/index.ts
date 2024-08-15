import express from "express";
import messagesRouter from './routes/messages';
import cors, {CorsOptions} from 'cors';
import fileDb from './fileDb';

const app = express();
const port = 8000;

const whiteList = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

run().catch(console.error);