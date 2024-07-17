import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { UserSubscription } from './user-subscription.entity';
import { Product } from '../../products/entities/product.entity';
import { Bundle } from '../../products/entities/bundle.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, unique: true })
  @Index() // Index on username for efficient querying
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  @Index() // Index on email for efficient querying
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => UserSubscription, (subscription) => subscription.user)
  subscriptions: UserSubscription[];

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[];

  @OneToMany(() => Bundle, (bundle) => bundle.creator)
  bundles: Bundle[];
}
