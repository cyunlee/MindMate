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
        postid,
        nickname,
        isauthor,
        userid
    } = req.body;

    try {
            const newComment = await Comment.create({
                nickname: nickname,
                content: content,
                postid: postid,
                isauthor: isauthor,
                userid: userid
            })

            console.log(newComment.nickname);
            console.log(newComment.content);
            console.log(newComment.postid);

            if(newComment){
                return res.json({
                    msg: '댓글 생성완료',
                    isError: false
                })
            }else if(!newComment){
                return res.json({
                    msg: '댓글 생성실패',
                    isError: true
                })
            }
        
        }catch(err){
            next(err);
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
