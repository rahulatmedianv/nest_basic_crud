import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  @Exclude()
  password: string;
}
