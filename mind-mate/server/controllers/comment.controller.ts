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
    const {
        postid
    } = req.query;
    try {
        let comments = await Comment.findAll({
            where: {postid: req.query.postid}
        });
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

//댓글 삭제하기
export async function deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
):Promise<Response | void>{

    const {nickname, createdAt, content} = req.body;

    try{
        let comment = await Comment.findOne({
            where: {nickname: nickname,
                    createdAt: createdAt,
                    content: content}
        })
        let commentdelete = await Comment.destroy({
            where: {commentid: comment.commentid}
        })

        if(commentdelete){
            return res.json({
                msg: '댓글 삭제 완료',
                isError: false
            })
        }else if(!commentdelete){
            return res.json({
                msg: '댓글 삭제 실패',
                isError: true
            })
        }
    }catch(err){
        next(err)
    }
}

//댓글 수정하기

export async function updateComment(
    req: Request,
    res: Response,
    next: NextFunction
):Promise<Response | void>{
    const {
        nickname,
        createdAt,
        newcontent
    }  = req.body;

    try{

        let comment = await Comment.findOne({
            where: {nickname: nickname,
                    createdAt: createdAt,
                    }
        })
        
        console.log('comment >>>>>', comment);

        let commentupdate = await Comment.update(
            {content: newcontent},
            {where: {commentid: comment.commentid}}
        )

        console.log('update>>>>', commentupdate);

        if(commentupdate){
            return res.json({
                msg: '댓글 수정 완료',
                isError: false
            })
        }else if(!commentupdate){
            return res.json({
                msg: '댓글 수정 실패',
                isError: true
            })
        }

    }catch(err){
        next(err);
    }
}
