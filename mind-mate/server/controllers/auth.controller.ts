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
            msg: 'Please Execute ID Valid check',
            isError: true,
        });
    }

    if (!userid || userid.trim().length <= 3) {
        return res.json({
            msg: 'ID should be at least 4 characters long.',
            isError: true,
        });
    }

    if (!password || password.trim().length <= 5) {
        return res.json({
            msg: 'Password should be at least 4 characters long.',
            isError: true,
        });
    }

    if (!(password === confirmPassword)) {
        return res.json({
            msg: `There's a difference between password and confirm password`,
            isError: true,
        });
    }

    if (!nickname || nickname.trim().length < 2) {
        return res.json({
            msg: 'Name should be at least 2 characters long',
            isError: true,
        });
    }
}