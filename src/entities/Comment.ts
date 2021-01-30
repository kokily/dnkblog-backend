import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Post from './Post';
import Reply from './Reply';
import User from './User';

@Entity()
class Comment extends BaseEntity {
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

  @Column({ type: 'text', nullable: true })
  profile!: string | null;

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: true })
  postId!: string;

  @ManyToOne((type) => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post!: Post;

  @OneToMany((type) => Reply, (reply) => reply.comment)
  replies!: [Reply];
}

export default Comment;
