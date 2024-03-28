import {Request, Response, NextFunction} from 'express';
import {db} from '../model';

const ExpertAnswer = db.ExpertAnswer;
const GeneralAnswer = db.GeneralAnswer;
const User = db.User;
const Post = db.Post;

//전문가 답변 등록
export async function createExpertAnswer(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {

    const {
        userid,
        title,
        content
    } = req.body;

    try{
        let writingUser = await User.findOne({
            where: {userid: req.body.userid}
        })

        if(writingUser.isExpert===true){
            let newExpertAnswer = await ExpertAnswer.create({
                userid: userid,
                title: title,
                content: content,
                nickname: writingUser.nickname
            })

            if(newExpertAnswer){
                return res.json({
                    msg: '전문답변 생성 완료',
                    ExpertAnswer: newExpertAnswer,
                    isError: false
                })
            }else if(!newExpertAnswer){
                return res.json({
                    msg: '전문답변 생성 실패',
                    isError: true
                })
            }
        }else{
            return res.json({
                msg: '전문답변 자격 불충족',
                isError: true
            })
        }

    }catch(err){
        next(err);
    }
}

//일반 답변 등록
export async function createGeneralAnswer(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void>{

    const {
        userid,
        title,
        content
    } = req.body

    try {

        let writingUser = await User.findOne({
            where: {userid: userid}
        })

        if(writingUser.isExpert===false){
            let newGeneralAnswer = await GeneralAnswer.create({
                userid: userid,
                title: title,
                content: content,
                nickname: writingUser.nickname
            })

            if(newGeneralAnswer){
                return res.json({
                    msg: '일반답변 생성 완료',
                    GeneralAnswer: newGeneralAnswer,
                    isError: false
                })
            }else if(!newGeneralAnswer){
                return res.json({
                    msg: '일반답변 생성 실패',
                    isError: true
                })
            }
        }else{
            return res.json({
                msg: '일반답변 자격 불충족',
                isError: true
            })
        }

    }catch(err){
        next(err);
    }

}

//전문답변 모두 불러오기
export async function getAllExpertAnswer(
    req: Request,
    res: Response,
    next: NextFunction
): Promise <Response | void> {

    const {postid} = req.query

    try{
        let expertAnswers = await ExpertAnswer.findAll({
            where: {postid: postid}
        })

        if(expertAnswers){
            return res.json({
                msg: '전문답변 로드 성공',
                ExpertAnswers: expertAnswers,
                isError: false
            })
        }else if(!expertAnswers){
            return res.json({
                msg: '전문답변 로드 실패',
                isError: true
            })
        }

    }catch(err){
        next(err)
    }
}

//일반답변 모두 불러오기

export async function getAllGeneralAnswers(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void>{
    const {postid} = req.query;

    try{

        let generalAnswers = await GeneralAnswer.findAll({
            where: {postid: postid}
        })

        if(generalAnswers){
            return res.json({
                msg: '일반답변 로드 성공',
                GeneralAnswers: generalAnswers,
                isError: false
            })
        }else if(!generalAnswers){
            return res.json({
                msg: '일반답변 로드 실패',
                isError: true
            })
        }

    }catch(err){
        next(err);
    }
}