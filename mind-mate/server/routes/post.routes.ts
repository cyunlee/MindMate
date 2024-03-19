const express = require('express');
import * as controller from '../controllers/post.controller';
export const postRouter = express();

postRouter.post('/writepost', controller.writepost);

