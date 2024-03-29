const express = require('express');
import * as controller from '../controllers/routine.controller';
export const routineRouter = express();

routineRouter.post('/createroutine', controller.createRoutine);