import 'express-async-errors';
import 'reflect-metadata';
import './config/env';
import './database/connection';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import AppError from './errors/AppError';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: '100kb' }));
app.disable('x-powered-by');

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(port);
