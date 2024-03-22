import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../model';

const ChatroomModel = db.Chatroom;


// Controller function to handle creating a new chat room
export const newChatRoom = async (req: Request, res: Response) => {
    try {
        // Extract necessary data from the request body
        console.log(req.body);
        const userid = req.body.userId;

        // Generate a random chatroomID (or use your own logic)
        const chatroomID = Math.floor(Math.random() * 100000000);

        // Set other properties
        const isChatBot = true;
        const chatToExpert = '';

        // Create a new chat room in the database
        const newChatRoom = await ChatroomModel.create({
            chatroomID,
            userid,
            isChatBot,
            chatToExpert
        });

        // Send a success response with the newly created chat room
        res.status(201).json(newChatRoom);
    } catch (error) {
        // Handle errors
        console.error('Error creating new chat room:', error);
        res.status(500).json({ error: 'Could not create new chat room' });
    }
};


// Controller function to handle fetching chat room list
// Controller function to handle fetching chat room list
export const getChatRoomList = async (req: Request, res: Response) => {
    try {
        // Access userId parameter from req.params
        const userId = req.params.userId;

        // Implement logic to fetch chat room list using userId if needed
        // For example:
        const chatRoomList = await ChatroomModel.findAll({ where: { userid: userId } });

        // Send chat room list as response
        res.status(200).json(chatRoomList);
    } catch (error) {
        // Handle errors
        console.error('Error fetching chat room list:', error);
        res.status(500).json({ error: 'Could not fetch chat room list' });
    }
};


// Controller function to handle inviting an expert
export const inviteExpert = async (req: Request, res: Response) => {
    try {
        // Implement logic to invite an expert to a chat room
        // Extract necessary data from request body or parameters
        // Perform necessary operations
        // Send success response
        res.status(200).json({ message: 'Expert invited successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error inviting expert:', error);
        res.status(500).json({ error: 'Could not invite expert' });
    }
};

// Controller function to handle quitting a chat
export const quitChat = async (req: Request, res: Response) => {
    try {
        // Implement logic to handle quitting a chat room
        // Extract necessary data from request body or parameters
        // Perform necessary operations
        // Send success response
        res.status(200).json({ message: 'Chat quit successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error quitting chat:', error);
        res.status(500).json({ error: 'Could not quit chat' });
    }
};
