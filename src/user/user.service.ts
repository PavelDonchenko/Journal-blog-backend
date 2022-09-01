import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.tdo.ts';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  create(dto: CreateUserDto) {
    return this.usersRepository.save(dto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findByCond(cond: LoginUserDto) {
    return this.usersRepository.findOneBy(cond);
  }

  update(id: number, dto: UpdateUserDto) {
    return this.usersRepository.update(id, dto);
  }

  async search(dto: SearchUserDto) {
    const qb = this.usersRepository.createQueryBuilder('u');
    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.fullName) {
      qb.andWhere(`u.fullName ILIKE :fullName`);
    }
    if (dto.email) {
      qb.andWhere(`u.email ILIKE :email`);
    }
    qb.setParameters({
      fullName: `%${dto.fullName}%`,
      email: `%${dto.email}%`,
    });
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
