import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Comment from './Comment';
import Reply from './Reply';

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  category!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'text', nullable: true })
  thumbnail!: string | null;

  @Column({ type: 'simple-array' })
  tags!: string[];

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @OneToMany((type) => Comment, (comment) => comment.postId)
  comments!: Comment[];

  @OneToMany((type) => Reply, (reply) => reply.postId)
  replies!: Reply[];
}

export default Post;
