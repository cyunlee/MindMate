import { Request, Response, NextFunction } from 'express';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: 'myApi' });

export async function AiChat(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
  try {
    console.log(req.body);
    console.log(req.body[0]);
    console.log(req.body.message);
    const  question  = req.body.message; // Assuming the question is sent in the request body

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }], // Use the user's question as input
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    const aiResponse = completion.choices[0].message.content; // Extract the AI response from the completion

    res.json({ answer: aiResponse }); // Return the AI response as an answer
  } catch (error) {
    console.error('Error in AI chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
