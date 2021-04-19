import AppError from '../errors/AppError';
import iUserRepository from '../interfaces/iUserRepository';
import UserRepository from '../repositories/UserRepository';
import User from '../models/User';

interface Request {
  id: string;
}

class EnableUserService {
  private userRepository: iUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: Request): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('usuário não encontrado', 400);
    }

    user.active = !user.active;

    await this.userRepository.save(user);

     return user;
  }
}

export default EnableUserService;
