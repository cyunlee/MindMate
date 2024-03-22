const express = require('express');
import * as controller from '../controllers/auth.controller';
export const authRouter = express();

//회원가입
authRouter.post('/signup', controller.signup);
//아이디 중복검사
authRouter.get('/idcheck', controller.idcheck);
//랜덤 닉네임 생성하기
authRouter.get('/random', controller.random);
//로그인
authRouter.post('/login', controller.login);
//로그인 연장
authRouter.post('/loginagain', controller.loginAgain)
//토큰 유효성 검사
authRouter.get('/verify', controller.verifyToken)
