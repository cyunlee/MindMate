import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { verifyToken } from './auth.controller';

import jwt from 'jsonwebtoken';

const Post = db.Post;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export async function writePost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {

    const {
        category,
        title,
        content
    } = req.body;

    const {authorization} = req.headers;

    try{

        if (typeof authorization !== 'string') {
            return res.status(400).json({
                msg: '유효하지 않은 토큰입니다',
                isError: true
            });
        }
    
        const decoded = await jwt.verify(authorization, JWT_SECRET) as { userid: string, nickname: string };

        console.log(decoded);

        const newPost = await Post.create({
            postType: category,
            title: title,
            content: content,
            userid: decoded.userid,
            nickname: decoded.nickname 
        })

        return res.json({
            msg: '포스트 생성 완료',
            isError: false
        })

    }catch(err){
        next(err);
    }
}

export async function getAllPost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {

    try {
        let allPosts = await Post.findAll();

        return res.json({
            allPosts: allPosts,
            isError: false
        })
    }catch (err) {
        next(err);
    }
}

