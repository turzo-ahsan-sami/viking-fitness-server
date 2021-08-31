import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) { }

    async showAll() {
        return await this.usersRepository.find();
    }

    async create(data: UsersDTO) {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(data);
        return user;
    }

    async findByUsername(username: string): Promise<UsersDTO> {
        return await this.usersRepository.findOne({
            where: {
                username: username,
            },
        });
    }

    async read(uuid: string) {
        return await this.usersRepository.findOne({ where: { uuid: uuid } });
    }

    async update(uuid: string, data: Partial<UsersDTO>) {
        await this.usersRepository.update({ uuid }, data);
        return await this.usersRepository.findOne({ uuid });
    }

    async destroy(uuid: string) {
        await this.usersRepository.delete({ uuid });
        return { deleted: true };
    }
}