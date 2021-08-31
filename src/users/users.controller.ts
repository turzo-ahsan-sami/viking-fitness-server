import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async showAllUsers() {
        const users = await this.usersService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Users fetched successfully',
            users
        };
    }

    @Post()
    async createUsers(@Body() data: UsersDTO) {
        const user = await this.usersService.create(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            user
        };
    }

    @Get(':uuid')
    async readUser(@Param('uuid') uuid: string) {
        const data = await this.usersService.read(uuid);
        return {
            statusCode: HttpStatus.OK,
            message: 'User fetched successfully',
            data,
        };
    }

    @Patch(':uuid')
    async uppdateUser(@Param('uuid') uuid: string, @Body() data: Partial<UsersDTO>) {
        await this.usersService.update(uuid, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
        };
    }

    @Delete(':uuid')
    async deleteUser(@Param('uuid') uuid: string) {
        await this.usersService.destroy(uuid);
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }
}