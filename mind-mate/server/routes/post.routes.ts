const express = require('express');
import * as controller from '../controllers/post.controller';
export const postRouter = express();

postRouter.post('/writepost', controller.writePost);
postRouter.get('/getallpost', controller.getAllPost);
postRouter.get('/getpost', controller.getPost);






