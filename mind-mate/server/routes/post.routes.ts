const express = require('express');
import * as controller from '../controllers/post.controller';
export const postRouter = express();

//포스트 작성
postRouter.post('/writepost', controller.writePost);
//전체 포스트 가져오기
postRouter.get('/getallpost', controller.getAllPost);
//카테고리별 포스트 가져오기
postRouter.get('/getpost', controller.getPost);
//디테일 포스트로 이동하기
postRouter.get('/getsinglepost', controller.getSinglePost);
//디테일 포스트 정보 가져오기
postRouter.get('/getdetailpost', controller.getDetailPost);
//포스트 삭제
postRouter.delete('/deletepost', controller.deletePost);
//포스트 수정
postRouter.patch('/updatepost', controller.updatePost);





