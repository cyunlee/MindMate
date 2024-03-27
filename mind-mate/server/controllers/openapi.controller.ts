import { Request, Response, NextFunction } from 'express';
import { OpenAI } from 'openai';

const API_KEY : string = process.env.API_KEY as string;

const openai = new OpenAI({ apiKey: API_KEY });

export async function AiChat(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
  try {
    console.log(req.body);
    console.log(req.body[0]);
    console.log(req.body.message);
    const  question  = req.body.message; 

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    const aiResponse = completion.choices[0].message.content;
    res.json({ answer: aiResponse });
  } catch (error) {
    console.error('Error in AI chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
