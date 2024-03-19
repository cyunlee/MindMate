import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { verifyToken } from './auth.controller';

const Post = db.Post;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export async function writepost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {

    const {
        category,
        title,
        content
    } = req.body;

    const {
        authorization
    } = req.headers;

    try{
        const newPost = await Post.create({
            postType: category,
            title: title,
            content: content,
            userid: '테스트',
            nickname: '테스트'
        })


        return res.json({
            msg: '포스트 생성 완료',
            isError: false
        })

    }catch(err){
        next(err);
    }
}