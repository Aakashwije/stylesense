import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './api/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.use('/', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
