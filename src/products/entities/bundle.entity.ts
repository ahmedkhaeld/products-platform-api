import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Bundle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  creationDate: Date;

  @ManyToOne(() => User, (user) => user.bundles, { onDelete: 'CASCADE' })
  creator: User;

  @ManyToMany(() => Product, (product) => product.bundles, { cascade: true })
  @JoinTable()
  products: Product[];
}
