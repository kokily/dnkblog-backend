import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'int', default: 1 })
  count!: number;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;
}

export default Tag;
