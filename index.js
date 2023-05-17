import express from 'express';
import { startServer } from './src/config/server/server-config.js';
import middlewares from './src/middlewares/utils/middlewares.js';
import routeIndex from './src/routes/routeIndex.js';
import dotenv from 'dotenv';
import { connectRedis } from './src/config/db/redis-config.js';

const app = express();

// for getting env variables
dotenv.config();

// calling all the essential middlewares
app.use(middlewares);

// connect to redis
connectRedis();

// entry to all routes
app.use('/', routeIndex);

// for listening
startServer(app);