import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../service/CreateUserService';
import EnableUserService from '../service/EnableUserService';

interface RequestBody {
  id: string;
  name: string;
  email: string;
  password?: any;
}

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password }: RequestBody = request.body;

    const userRepository = new UserRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password
    });

    delete user.password;

    return response.json(user);
  }

  public async enable(request: Request, response: Response): Promise<Response> {
    const { id }: RequestBody = request.params;

    const userRepository = new UserRepository();
    const enableUser = new EnableUserService(userRepository);

    const user = await enableUser.execute({
      id
    });

    delete user.password;

    return response.json(user);
  }
}

export default UserController;
