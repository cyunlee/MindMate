const express = require('express');
import * as controller from '../controllers/auth.controller';
export const authRouter = express();

authRouter.post('/signup', controller.signup);
authRouter.get('/idcheck', controller.idcheck);
authRouter.get('/random', controller.random);
authRouter.post('/login', controller.login);
authRouter.post('/loginagain', controller.loginAgain)
authRouter.get('/verify', controller.verifyToken)
