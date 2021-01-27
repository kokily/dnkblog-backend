import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text', nullable: true })
  @IsEmail()
  email!: string | null;

  @Column({ type: 'text', nullable: true })
  password!: string | null;

  @Column({ type: 'text', nullable: true })
  profile!: string | null;

  @Column({ type: 'boolean' })
  admin!: boolean;

  @Column({ type: 'text', nullable: true })
  verify_key!: string | null;

  @Column({ type: 'boolean', default: false })
  verified!: boolean;

  @Column({ type: 'text', default: null, nullable: true })
  githubId!: string | null;

  @Column({ type: 'text', default: null, nullable: true })
  googleId!: string | null;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  private hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  public setPassword = async (password: string): Promise<void> => {
    this.password = await this.hashPassword(password);
  };

  public validPassword = async (password: string): Promise<boolean> => {
    if (this.password) {
      return await bcrypt.compare(password, this.password);
    } else {
      return false;
    }
  };

  public generateToken = (): string => {
    const token = {
      userId: this.id,
    };

    return jwt.sign(token, process.env.TOKEN_SECRET!, {
      expiresIn: '7d',
    });
  };
}

export default User;
