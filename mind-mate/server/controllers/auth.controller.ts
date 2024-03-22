import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { db } from '../model';

const User = db.User;
const Adjective = db.Adjective;
const Noun = db.Noun;

// import crypto from 'crypto';

// const generateRandomString = (length: number): string => {
//     return crypto.randomBytes(Math.ceil(length / 2))
//       .toString('hex')
//       .slice(0, length);
//   };
  
// const JWT_SECRET: string = generateRandomString(32);

const JWT_SECRET: string = process.env.JWT_SECRET as string;

//아이디 중복 체크
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

//랜덤 닉네임
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

//회원가입
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
                isError: false
            })
        }

        if(existingUser){
            return res.json({
                msg: '이미 존재하는 아이디가 있습니다',
                isError: true
            })
        }

        if(userid.length<6){
            return res.json({
                msg: '아이디 입력조건 불충족',
                isError: true
            })
        }

        if(password!=confirmPassword){
            return res.json({
                msg: '비밀번호 확인 불일치',
                isError: true
            })
        }

        if(nickname.length<2){
            return res.json({
                msg: '닉네임 입력조건 불충족',
                isError: true
            })
        }
            
    }catch (err){
        next(err);
    }
}

//로그인
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
            const accessToken = jwt.sign({userid: loginUser.userid, nickname: loginUser.nickname, password: loginUser.password}, JWT_SECRET, {expiresIn: '10m'});
            return res.json({
                msg: '로그인 성공',
                accessToken: accessToken,
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

//로그인 연장
export async function loginAgain(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<Response | void> {
    const {userid, password, nickname} = req.body;
    console.log('login again 정보 잘 받아와지는지 확인 >>>>>>', userid, password, nickname)

    try{ 

        console.log('서버에서 토큰 재발급 중');
        const accessToken = jwt.sign({userid: userid, nickname: nickname, password: password}, JWT_SECRET, {expiresIn: '10m'});
        return res.json({
            msg: '로그인 연장용 토큰 재발급 성공',
            accessToken: accessToken,
            userid: userid,
            password: password,
            nickname: nickname,
            isError: false
        })
      
    }catch(err){
        next(err);
    }
}

//토큰 유효성 검사
export async function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<Response | void> {
    const {authorization} = req.headers;

    try{
        if(!authorization){
            return res.json({
                msg: '토큰이 없습니다',
                isError: true
            })
        }

        if(typeof authorization !== 'string'){
            return res.status(400).json({
                msg: '토큰 타입이 string이 아닙니다',
                isError: true
            })
        }

        try{
            const decoded = jwt.verify(authorization, JWT_SECRET) as { userid: string, nickname: string };
            return res.json({
                decoded: decoded,
                isError: false
            })

            }catch(err){
                if(err instanceof TokenExpiredError){
                    return res.status(401).json({
                        msg: '토큰이 만료되었습니다',
                        isExpired: true
                });
            }else{
                throw err;
            }
        }
        

    }catch(err){
        next(err)
    }
   

    // if(!authorization) {
    //     return res.json({
    //         msg: '토큰이 없습니다',
    //         isError: true
    //     })
    // }

    // if(authorization) {
    //      jwt.verify(authorization, JWT_SECRET, (err, decoded) => {
    //         if (err) {
    //             return res.json({
    //                 msg: '유효하지 않은 토큰입니다',
    //                 isError: true
    //             })
    //         }else {
    //             return res.json ({
    //                 decoded: decoded,
    //                 isError: false 
    //             })
    //         }
    //     })
    // }
    
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