import {Request, Response, NextFunction} from 'express';
import {db} from '../model';

import jwt, { TokenExpiredError } from 'jsonwebtoken';

const Comment = db.Comment;

const JWT_SECRET: string = process.env.JWT_SECRET as string;

//댓글 생성하기
export async function postComment(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {
        content,
        postid
    } = req.body;


    let { authorization } = req.headers;

    try {

        if(typeof authorization !== 'string'){
            return res.status(400).json({
                msg: '토큰 타입이 string이 아닙니다',
                isError: true
            });
        }
        try{
            const decoded = jwt.verify(authorization, JWT_SECRET) as { userid: string, nickname: string };

             console.log("decode: ", decoded, "postid: ", postid, "content: ", content)

            const newComment = await Comment.create({
                nickname: decoded.nickname,
                content: content,
                postid: postid,
            })

             return res.json({
                msg: '댓글 생성완료',
                isError: false
            })

            }catch(err){
                if(err instanceof TokenExpiredError){
                    return res.status(401).json({
                        msg: '토큰이 만료되었습니다',
                        isError: true
                });
            }else{
                next(err)
            }
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