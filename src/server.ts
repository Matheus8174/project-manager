import './database/connection';
import express from 'express';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'hello' });
});

app.listen(port);
