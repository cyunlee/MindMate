import {Request, Response, NextFunction} from 'express';
import {db} from '../model';

import jwt from 'jsonwebtoken';

const Comment = db.Comment;

const JWT_SECRET: string = process.env.JWT_SECRET as string;

//댓글 생성하기
export async function postComment(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {
        content 
    } = req.body;

    const { authorization } = req.headers;

    try {

        if(typeof authorization !== 'string'){
            return res.status(400).json({
                msg: '유효하지 않은 토큰입니다',
                isError: true
            });
        }

        const decoded = await jwt.verify(authorization, JWT_SECRET) as { userid: string, nickname: string };

        let newComment = await Comment.create({
            nickname: decoded.nickname,
            content: content
        })

        if(newComment){
            return res.json({
                msg: '댓글 생성완료',
                isError: false
            })
        }else if(!newComment){
            return res.json({
                msg: '댓글 생성 실패',
                isError: true
            })
        }
    }catch(err){
        next(err)
    }
}

//댓글 가져오기
export async function getComment(
    req: Request,
    res: Response,
    next: NextFunction
):Promise<Response | void> {
    try {
        let comments = await Comment.findAll({});
        if(comments){
            return res.json({
                comments: comments,
                isError: false
            })
        }else if(!comments){
            return res.json({
                msg: '댓글이 없습니다',
                isError: true
            })
        }
    }catch(err) {
        next(err)
    }
}