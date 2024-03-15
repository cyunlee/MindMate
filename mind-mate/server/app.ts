import dotenv from 'dotenv';
dotenv.config();
const http = require('http');
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import sequelize from 'sequelize';
import path from 'path';
import { Op } from 'sequelize';
import { authRouter } from './routes/auth.routes';
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
app.use(cors());

const server = createServer(app);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
  path: '/socket.io',
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

//서버에서
// socket.on 메서드 - 클라이언트에서 메세지를 보낸다.
// "chatting"은 채널 아이디, data = 클라이언트에서 받은 데이터
io.on('chatting', (data) => {
  // console.log(data);
  const { name, msg } = data;
  // io.emit - 서버에서 클라이언트로 메시지 전송
  io.emit('chatting', {
    name: name,
    msg: msg,
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
