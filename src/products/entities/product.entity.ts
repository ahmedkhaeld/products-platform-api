import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Bundle } from './bundle.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isBundle: boolean;

  @CreateDateColumn()
  creationDate: Date;

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  creator: User;

  @ManyToMany(() => Bundle, (bundle) => bundle.products)
  bundles: Bundle[];
}
