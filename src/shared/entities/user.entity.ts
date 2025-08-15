import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Exclude()
    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: false, default: true })
    isActive: boolean;

    @Column({ nullable: false, default: false })
    isBlocked: boolean;

    @Column({ nullable: false, default: false })
    deleted: boolean

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    
    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        await this.hashPassword();
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (!this.password.startsWith('$2b$')) {
            await this.hashPassword();
        }
    }

    private async hashPassword() {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    async comparePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }

}
