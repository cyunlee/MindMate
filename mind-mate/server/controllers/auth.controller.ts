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
        nickname
    } = req.body;

    console.log(userid);
    console.log(password);
    console.log(nickname);
}