import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../model';

const ChatroomModel = db.Chatroom;

export const newChatRoom = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const userid = req.body.userId;

        const chatroomID = Math.floor(Math.random() * 100000000);

        const isChatBot = true;
        const chatToExpert = '';

        const newChatRoom = await ChatroomModel.create({
            chatroomID,
            userid,
            isChatBot,
            chatToExpert
        });

        res.status(201).json(newChatRoom);
    } catch (error) {
        console.error('Error creating new chat room:', error);
        res.status(500).json({ error: 'Could not create new chat room' });
    }
};

export const getChatRoomList = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const chatRoomList = await ChatroomModel.findAll({ where: { userid: userId } });

        res.status(200).json(chatRoomList);
    } catch (error) {
        console.error('Error fetching chat room list:', error);
        res.status(500).json({ error: 'Could not fetch chat room list' });
    }
};


export const inviteExpert = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: 'Expert invited successfully' });
    } catch (error) {
        console.error('Error inviting expert:', error);
        res.status(500).json({ error: 'Could not invite expert' });
    }
};

export const quitChat = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: 'Chat quit successfully' });
    } catch (error) {
        console.error('Error quitting chat:', error);
        res.status(500).json({ error: 'Could not quit chat' });
    }
};
