import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const Post = db.Post;

export async function writepost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {
        category,
        title,
        content,
        createdAt,
    } = req.body

    try{

    }catch(err){
        next(err);
    }
}