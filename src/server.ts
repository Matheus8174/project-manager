import 'reflect-metadata';
import './database/connection';
import express from 'express';
import routes from './routes';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: '100kb' }));
app.disable('x-powered-by');

app.use(routes);

app.listen(port);
