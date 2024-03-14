import dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import sequelize from 'sequelize';
import path from 'path';
import { Op } from 'sequelize';
import { authRouter } from './routes/auth.routes';
import { db } from './model';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(
  cors({
      // credentials: true,
      // origin: ['http://localhost:3000', 'http://localhost:4000'],
      // methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
  })
);

const server = createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('client connected');
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
