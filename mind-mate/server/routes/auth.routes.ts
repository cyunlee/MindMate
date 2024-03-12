const express = require('express');
import * as controller from '../controllers/auth.controller';
export const authRouter = express();

authRouter.post('/signup', controller.signup);

