const express = require('express');
import * as controller from '../controllers/auth.controller';
export const authRouter = express();

authRouter.post('/signup', controller.signup);
authRouter.get('/idcheck', controller.idcheck);
authRouter.get('/random', controller.random);
authRouter.post('/login', controller.login);
authRouter.get('/userinfo', controller.userinfo)
