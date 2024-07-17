import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';
import { Bundle } from '../../products/entities/bundle.entity';

@Entity()
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Bundle, { cascade: true })
  @JoinTable()
  bundles: Bundle[];
}
