import path from 'path';
import {CorsOptions} from 'cors';

const rootPath = __dirname;

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

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  corsOptions,
};

export default config;