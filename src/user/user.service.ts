import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ServiceResponse } from '../common/service-response';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(createUserDto: CreateUserDto): Promise<ServiceResponse> {
    const serviceResponse: ServiceResponse = { data: null, error: null };
    // hash the password
    const salt = bcryptjs.genSaltSync(10);
    createUserDto.password = bcryptjs.hashSync(createUserDto.password, salt);
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    const newUser = await this.userRepository.save(user);

    serviceResponse.data = {
      user: newUser,
    };
    return serviceResponse;
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  async findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @returns promise of user
   * @param id
   */
  async getUser(id: string): Promise<User> {
    const _id = parseInt(id);
    return this.userRepository.findOneBy({ id: _id });
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username: username });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email: email });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of update user
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const _id = parseInt(id);
    const user: User = new User();
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = _id;
    return this.userRepository.save(user);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns number of rows deleted or affected
   */
  removeUser(id: string): Promise<{ affected?: number }> {
    const _id = parseInt(id);
    return this.userRepository.delete(_id);
  }
}
