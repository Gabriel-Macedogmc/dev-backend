import { Address } from './../../../../address/infra/typeorm/entities/Address';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type EthnicityType =
  | 'branca'
  | 'amarela'
  | 'parda'
  | 'preta'
  | 'indígena';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  telephone: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: ['branca', 'amarela', 'parda', 'preta', 'indígena'],
    default: 'branca',
  })
  ethnicity: EthnicityType;

  @OneToMany(() => Address, address => Address)
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
