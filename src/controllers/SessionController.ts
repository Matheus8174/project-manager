import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import SessionService from '../service/SessionService';

interface RequestBody {
  name: string;
  email: string;
  password?: any;
}

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password }: RequestBody = request.body;

    const userRepository = new UserRepository();
    const createSession = new SessionService(userRepository);

    const session = await createSession.execute({
      email,
      password
    });

    return response.json(session);
  }
}

export default SessionController;
