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
import User from './User';
import Post from './Post';
import Comment from './Comment';

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

  @Column({ type: 'text', nullable: true })
  profile!: string | null;

  @ManyToOne((type) => User, (user) => user.replies)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: true })
  postId!: string;

  @ManyToOne((type) => Post, (post) => post.replies)
  @JoinColumn({ name: 'postId' })
  post!: Post;

  @Column({ nullable: true })
  commentId!: string;

  @ManyToOne((type) => Comment, (comment) => comment.replies)
  @JoinColumn({ name: 'commentId' })
  comment!: Comment;
}

export default Reply;
