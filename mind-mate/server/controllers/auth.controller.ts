import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const User = db.User;
const Adjective = db.Adjective;
const Noun = db.Noun;

export async function idcheck(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {
        userid
    } = req.query;

    try{
        let existingUser = await User.findOne({
            where: {userid: req.query.userid}
        })

        if(existingUser){
            return res.json({
                msg: '이미 존재하는 아이디가 있습니다',
                isDuplicated: true,
                isError: true
            })
        }else if(!existingUser){
            return res.json({
                msg: '사용 가능한 아이디입니다',
                isDuplicated: false,
                isError: false
            })
        }

    }catch (err){
        next(err);
    }
}

export async function random(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<Response | void> {
    try{

        let randomAdjective = await Adjective.findAll();
        let randomNoun = await Noun.findAll();

        return res.json({
            adjective: randomAdjective,
            noun: randomNoun
        })
    }catch (err){
        next(err);
    }
}

export async function signup(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {
        userid,
        password,
        nickname,
        confirmPassword
    } = req.body;

    try{
        let existingUser = await User.findOne({
            where: {userid: req.body.userid}
        })

        if(!existingUser && userid.length>=6 && password===confirmPassword && nickname.length>=2){
            const newUser = await User.create({
                userid: userid,
                password: password,
                nickname: nickname
            })
            return res.json({
                msg: '회원가입 성공',
                isError: 'false'
            })
        }

        if(existingUser){
            return res.json({
                msg: '이미 존재하는 아이디가 있습니다',
                isError: 'true'
            })
        }

        if(userid.length<6){
            return res.json({
                msg: '아이디 입력조건 불충족',
                isError: 'true'
            })
        }

        if(password!=confirmPassword){
            return res.json({
                msg: '비밀번호 확인 불일치',
                isError: 'true'
            })
        }

        if(nickname.length<2){
            return res.json({
                msg: '닉네임 입력조건 불충족',
                isError: 'true'
            })
        }
            
    }catch (err){
        next(err);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<Response | void> {
    const {
        userid : userid,
        password : password
    } = req.body;


    try{
        let loginUser = await User.findOne({
            where : {
                userid : userid,
                password : password
            }
        })
        if(loginUser){
            return res.json({
                msg: 'Login success!',
                isError: false
            })
        }
        if(!loginUser){
            return res.json({
                msg: 'User not found',
                isError: true
            })
        }
    }catch (err){
        next(err)
    }
    
}