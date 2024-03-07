import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routes/routes.index';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
