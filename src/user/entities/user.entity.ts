import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

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
}
