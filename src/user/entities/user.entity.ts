import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['firstName', 'lastName']) // Composite index on firstName and lastName for efficient querying
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  @Index() // Index on firstName for efficient querying
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  middleName: string;

  @Column({ type: 'varchar', length: 30 })
  @Index() // Index on lastName for efficient querying
  lastName: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  @Index() // Index on username for efficient querying
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  @Index() // Index on email for efficient querying
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;

  @Column({ type: 'date' })
  dob: string;
}
