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
        content
    } = req.body;

    const {
        authorization
    } = req.headers;

    try{
        const newPost = await Post.create({
            postType: category,
            title: title,
            content: content
        })

        return res.json({
            msg: '포스트 생성 완료',
            isError: false
        })

    }catch(err){
        next(err);
    }
}