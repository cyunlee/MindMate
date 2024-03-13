import { Request, Response, NextFunction } from 'express';
import { db } from '../model';
const User = db.User;

export async function signup(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const {
        userid,
        password,
        confirmPassword,
        nickname,
        isUnique,
    } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({
            where: { userid: req.body.userid },
        });
    } catch (err) {
        return next(err);
    }

    if (!isUnique || JSON.parse(isUnique) == false || existingUser) {
        return res.json({
            msg: '아이디가 유효하지 않습니다',
            isError: true,
        });
    }

    if (!userid || userid.trim().length <= 3) {
        return res.json({
            msg: '아이디는 4글자 이상이어야 합니다',
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