import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { sequelize, User } from '../model/Main.ts';
import bodyParser from 'body-parser';

export default async function test_db(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    console.log(req.body);
    let id = req.body[0];
    let username = req.body[1];
    console.log('id ', id, 'username ', username);

    console.log('Test database connection');
    const result = await User.findAll({
      where: {
        id: id,
        username: username,
      },
    });

    // 결과를 클라이언트에게 반환
    res.json(result);
  } catch (err) {
    console.error('Error fetching enemy deck data:', err);
    res.status(500).send('Internal Server Error');
  }
}
