import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const sequelize = require('sequelize');
const path = require('path');
const app = express();
export const server = http.createServer(app);
const PORT = 4000;

import { Op } from 'sequelize';
import { authRouter } from './routes/auth.routes';
import { db } from './model';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(cors());

db.sequelize
    .sync({ force: false })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.log(err);
    });