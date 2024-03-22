const express = require('express');
import * as controller from '../controllers/chat.controller';
export const chatRouter = express();

chatRouter.post('/newChatRoom', controller.newChatRoom);
chatRouter.get('/getChatRoomList/:userId', controller.getChatRoomList);
chatRouter.get('/inviteExpert', controller.inviteExpert);
chatRouter.get('/quitChat', controller.quitChat);
