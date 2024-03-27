import {Request, Response, NextFunction} from 'express';
import {db} from '../model';

const User = db.User;

const MINDMATE_PASS = process.env.MINDMATE_PASS;
const MINDMATE_ACCOUNT = process.env.MINDMATE_ACCOUNT;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: MINDMATE_ACCOUNT,
        pass: MINDMATE_PASS
    }
})

async function sendMail({to, from, html, subject}: {to: string, from: string, html: string, subject: string}) {
    try{
        let info = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: html
        });
    }catch(err){
        console.error(err);
    }
}


export async function sendEmail(
    req: Request,
    res: Response,
    next: NextFunction
):Promise<Response | void>{

    const {email} = req.body;

    try{

        const randomNum = Math.floor(Math.random() * 99998) + 1;

        sendMail({
            from: '마음메이트',
            to: email,
            subject: '마음메이트(MindMate) 인증번호 입니다',
            html: `<p>인증번호는 ${randomNum} 입니다.</p>`
        })

        return res.json({
            msg: '이메일 전송 완료',
            randomNum: randomNum,
            isError: false
        })
        
    }catch(err){
        next(err);
    }
}

export async function expertAuth(
    req: Request,
    res: Response,
    next: NextFunction
):Promise<Response | void>{

    const{email, isExpert, userid} = req.body;

    try{

        let userupdate = await User.update(
            {isExpert: isExpert, email: email},
            {where: {userid: userid}}
        )

        if(userupdate){
            return res.json({
                msg: '전문가 여부 반영 성공',
                isError: false
            })
        }else if(!userupdate){
            return res.json({
                msg: '전문가 여부 반영 실패',
                isError: true
            })
        }

    }catch(err){
        next(err);
    }

}