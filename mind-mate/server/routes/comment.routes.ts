const express = require('express');
import * as controller from '../controllers/comment.controller';
export const commentRouter = express();

//댓글 생성하기
commentRouter.post('/postcomment', controller.postComment);
//생성된 댓글 가져오기
commentRouter.get('/getcomment', controller.getComment);