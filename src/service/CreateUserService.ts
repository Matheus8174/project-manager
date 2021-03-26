import { hash } from 'bcryptjs';
import iUserRepository from '../interfaces/iUserRepository';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: iUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, name, password }: Request): Promise<User> {
    const passwordhash = await hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordhash
    });

    return user;
  }
}

export default CreateUserService;
