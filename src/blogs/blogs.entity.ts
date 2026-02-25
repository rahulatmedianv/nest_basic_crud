import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'text' })
  description: string;
}
