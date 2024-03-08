import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routes/routes.index';

const app = express();
dotenv.config();

/*app.use(
  '/api',
  createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true })
);*/
// Use express.json() and express.urlencoded() instead of bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4000;

app.use(cors());
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}/`);
});
