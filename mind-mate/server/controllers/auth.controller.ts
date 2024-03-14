import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const User = db.User;

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
                msg: '이미 존재하는 아이디가 있습니다.',
                isDuplicated: false,
                isError: true
            })
        }else if(!existingUser){
            return res.json({
                msg: '아이디 중복 검사 통과',
                isDuplicated: true,
                isError: false
            })
        }

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
        confirmPassword,
        nickname
    } = req.body;

    if (!userid || userid.trim().length <= 5) {
        return res.json({
            msg: '아이디는 6글자 이상이어야 합니다',
            isError: true,
        });
    }

    if (!password || password.trim().length <= 5) {
        return res.json({
            msg: '비밀번호는 4글자 이상이어야 합니다',
            isError: true,
        });
    }

    if (!(password === confirmPassword)) {
        return res.json({
            msg: '비밀번호를 다시 한 번 확인해주세요',
            isError: true,
        });
    }

    if (!nickname || nickname.trim().length < 2) {
        return res.json({
            msg: '닉네임은 2글자 이상이어야 합니다',
            isError: true,
        });
    }
}