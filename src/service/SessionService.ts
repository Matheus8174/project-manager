import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import iUserRepository from '../interfaces/iUserRepository';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

class SessionService {
  private userRepository: iUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordCompare = await compare(password, user.password);

    if (!user.active) {
      throw new AppError('Usuário inativo', 401);
    }

    if (!passwordCompare) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      expiresIn: '1d'
    });

    delete user.password;

    return {
      token,
      user
    };
  }
}

export default SessionService;
