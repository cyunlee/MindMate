const express = require('express');
import * as controller from '../controllers/mail.controller';
export const mailRouter = express();

//메일 보내기
mailRouter.post('/sendmail', controller.sendEmail);
//전문가 인증 기반으로 유저 정보 수정하기
mailRouter.patch('/expertauth', controller.expertAuth);
