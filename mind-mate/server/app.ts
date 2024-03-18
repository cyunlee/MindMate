import dotenv from 'dotenv';
dotenv.config();
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import sequelize from 'sequelize';
import path from 'path';
import { Op } from 'sequelize';
import { authRouter } from './routes/auth.routes';
import { postRouter } from './routes/post.routes';
import { db } from './model';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from './types/types';

const app = express();


const SERVERPORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRouter);
app.use('/api', postRouter);
app.use(cors());


const server = createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Handle the connection event
io.on('connection', (socket: Socket) => {
  console.log('A client connected');

  // Handle custom events from clients
  socket.on('chat message', (msg: string) => {
    console.log('Message received from client:', msg);

    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    server.listen(SERVERPORT, () => {
      console.log(`Server is running on ${SERVERPORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
