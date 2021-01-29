import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Post from './Post';
import User from './User';

@Entity()
class Reply extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'boolean', default: false })
  deleted!: boolean;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @Column()
  userId!: string;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text' })
  profile!: string | null;

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  postId!: string;

  @ManyToOne((type) => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post!: Post;
}

export default Reply;
