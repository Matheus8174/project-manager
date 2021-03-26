import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../models/User';

interface iUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(createUserDTO: CreateUserDTO): Promise<User>;
}

export default iUserRepository;
