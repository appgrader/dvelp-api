import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import dotenv from 'dotenv';
dotenv.config();

import { config } from './config';
import { logger } from './logging';
import { routes } from './routes';

const app = new Koa();

app.use(logger);
app.use(bodyParser());
app.use(json());
app.use(routes);
app.use(cors());

app.listen(config.port);

console.log(`Server running on port http://localhost:${config.port}`);
