import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
import { verifyToken } from './auth.controller';

import jwt from 'jsonwebtoken';

const Post = db.Post;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

//포스트 작성하기
export async function writePost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {

    const {
        category,
        title,
        content,
        categoryVal
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
            categoryVal: categoryVal,
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

//게시글 목록 가져오기 (전체)
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

//게시글 목록 가져오기(카테고리)
export async function getPost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {

        const {category} = req.query;

        let Posts = await Post.findAll({
             where: {postType: category}
        })

        return res.json({
            Posts: Posts,
            isError: false
        })
    }catch(err){
        next(err);
    }
}

//디테일 포스트로 이동하기
export async function getSinglePost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {createdAt} = req.query;
    try{
        let singlePost = await Post.findOne({
            where: {createdAt: createdAt}
        })

        if(singlePost){
            return res.json({
                singlePost: singlePost,
                isError: false
            })
        }else if(!singlePost){
            return res.json({
                msg: '해당하는 포스트가 없습니다',
                isError: true
            })
        }

    }catch(err){
        next(err);
    }
}

//상세포스트 가져오기 
export async function getDetailPost(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {postid} = req.query;
    try{
        let detailPost = await Post.findOne({
            where: {postid: postid}
        })

        if(detailPost){
            return res.json({
                detailPost: detailPost,
                isError: false
            })
        }else if(!detailPost){
            return res.json({
                msg: '해당하는 포스트 정보가 없습니다',
                isError: true
            })
        }

    }catch(err){
        next(err);
    }
}

