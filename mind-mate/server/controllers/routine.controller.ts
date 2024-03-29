import { Request, Response, NextFunction } from 'express';
import { OpenAI } from 'openai';
import { db } from '../model';

const API_KEY : string = process.env.API_KEY as string;

const openai = new OpenAI({ apiKey: API_KEY });

export async function createRoutine(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    
    const {dInfo, aInfo, dSum, aSum} = req.body;

    const forapi = `
    우울증상의 평가지표 : ${dInfo}, 불안증상의 평가지표 : ${aInfo}
    우울증상의 총점 : ${dSum}점, 불안증상의 총점 : ${aSum}점
    
    주어진 평가 지표에 따라서, 사용자의 총점을 지표에 따라 증상의 심각도를 판단하고, 판단된 심각도에 따라 일상 속에서 가지면 좋은 습관을 5개 활동명만 부가설명 없이 리스트로 나열해줘 (심각도가 다르면 활동명이 중복되지 않도록)`

    try{
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: forapi}]
        })

        const aiRoutine = response.choices[0].message.content;

        console.log(aiRoutine);

        return res.json({
            aiRoutine: aiRoutine,
            msg: 'ai 루틴 생성 완료',
            isError: false
        })
    }catch(err){
        next(err);
    }
}