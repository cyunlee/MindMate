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
import { chatRouter } from './routes/chat.routes';
import { commentRouter } from './routes/comment.routes';
import { openapiRouter } from './routes/openapi.routes';
import { mailRouter } from './routes/mail.routes';
import { routineRouter } from './routes/routine.routes';
import { db } from './model';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from './types/types';

const app = express();
const bodyParser = require('body-parser');


const SERVERPORT = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', chatRouter);
app.use('/api', commentRouter);
app.use('/api', openapiRouter);
app.use('/api', mailRouter);
app.use('/api', routineRouter);
app.use(cors());


const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('A client connected');
  socket.on('join', ({ userId, roomId }) => {
    console.log(`User ${userId} joined room ${roomId}`);

    socket.join(roomId);
  });


socket.on('chat message', async (roomId: number, userId: string, message: string) => {
  console.log('Message received from client:', message);
  console.log('chat message', roomId, userId, message);
  try {
    await db.ChatMessage.create({
      chatroomID: roomId,
      userid: userId,
      content: message
    });
    console.log('Message saved to database');
  } catch (error) {
    console.error('Error saving message to database:', error);
  }

  io.emit('chat message', message);
});


  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});


//DB와 sequelize 동기화

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