const express = require('express');
import * as controller from '../controllers/auth.controller';
export const authRouter = express();

authRouter.post('/signup', controller.signup);
authRouter.get('/idcheck', controller.idcheck);
authRouter.get('/random', (req: any, res: any) => {
  console.log('으아아');
});
authRouter.get('/random', controller.random);
