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
import { TokensType } from '../types/global';

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

  @Column({ type: 'text', nullable: true })
  refresh_token!: string | null;

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

  public generateToken = (): TokensType => {
    const accessToken = jwt.sign({ userId: this.id }, process.env.ACCESS_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: this.id }, process.env.REFRESH_TOKEN!, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  };
}

export default User;
