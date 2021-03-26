import { Router } from 'express';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

// routes.get('/', (request, response) => {
//   return response.json({ message: 'hello' });
// });

routes.use(`${prefixRoutes}/users`, userRoutes);

export default routes;
