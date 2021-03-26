import { getRepository, Repository } from 'typeorm';
import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../models/User';
import iUserRepository from '../interfaces/iUserRepository';

class UserRepository implements iUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }
  public async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;
