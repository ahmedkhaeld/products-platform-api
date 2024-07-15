import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserParamDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';
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
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.middleName = createUserDto.middleName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    user.dob = createUserDto.dob;
    return this.userRepository.save(user);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @returns promise of user
   * @param id
   */
  getUser(id: string): Promise<User> {
    const _id = parseInt(id);
    return this.userRepository.findOneBy({ id: _id });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of update user
   */
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const _id = parseInt(id);
    const user: User = new User();
    user.firstName = updateUserDto.firstName;
    user.middleName = updateUserDto.middleName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.dob = updateUserDto.dob;
    user.gender = updateUserDto.gender;
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
