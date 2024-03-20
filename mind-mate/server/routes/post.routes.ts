const express = require('express');
import * as controller from '../controllers/post.controller';
export const postRouter = express();

//포스트 작성
postRouter.post('/writepost', controller.writePost);
//전체 포스트 가져오기
postRouter.get('/getallpost', controller.getAllPost);
//카테고리별 포스트 가져오기
postRouter.get('/getpost', controller.getPost);
//디테일 포스트 가져오기
postRouter.get('/getsinglepost', controller.getSinglePost);






