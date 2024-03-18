import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../model';
const User = db.User;
const Adjective = db.Adjective;
const Noun = db.Noun;

const JWT_SECRET: string = process.env.JWT_SECRET as string;

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

    console.log(req.body);

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
        userid,
        password
    } = req.body;

    try{
        let loginUser = await User.findOne({
            where : {
                userid: req.body.userid,
                password: req.body.password
            }
        });
        if(loginUser){
            const token = jwt.sign({userid: userid}, JWT_SECRET, {expiresIn: '1h'});
            return res.json({
                msg: '로그인 성공',
                token: token,
                isError: false
            })
        }
        if(!loginUser){
            return res.json({
                msg: '아이디 혹은 비밀번호 불일치',
                isError: true
            })
        }
    }catch (err){
        next(err)
    }
    
}

//JWT 인증 미들웨어

interface CustomRequest extends Request {
    userid?: string; // userid 속성은 선택적으로 정의
}

export function authenticateJWT(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ msg: 'Failed to authenticate token' });
            }

            // decodedToken에서 userid를 가져옴
            const userid = (decodedToken as JwtPayload).userid;

            // req에 userid를 추가
            req.userid = userid;

            next();
        });
    } else {
        return res.status(401).json({ msg: 'No token provided' });
    }
}