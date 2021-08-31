import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class UsersEntity {    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string = uuidv4();

    @Column()
    username: string;
    
    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
    @Column()
    password: string;

    @Column({ default: "active" })
    status: string;
}