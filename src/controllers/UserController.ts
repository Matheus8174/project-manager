import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../service/CreateUserService';

interface RequestBody {
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
}

export default UserController;
