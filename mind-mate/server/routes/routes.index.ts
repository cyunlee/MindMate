import express from 'express';
import { Request, Response, NextFunction } from 'express';
import test_db from '../controllers/cmain.controller.ts';

const router = express.Router();

router.post('/test', test_db);

export default router;
