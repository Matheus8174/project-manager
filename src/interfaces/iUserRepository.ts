import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../models/User';

interface iUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(createUserDTO: CreateUserDTO): Promise<User>;

  //metodo de atualizar
  save(user: User): Promise<User>;
}

export default iUserRepository;
