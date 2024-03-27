import express from 'express';
import * as controller from '../controllers/openapi.controller';

export const openapiRouter = express();

openapiRouter.post('/aichat', controller.AiChat);
