import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Review } from '../tour/entities/review.entity';
import { Booking } from '../tour/entities/booking.entity';
import { Tour } from '../tour/entities/tour.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  LEAD_GUIDE = 'lead-guide',
  GUIDE = 'guide',
}
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: 'default.jpg',
  })
  photo: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: 'user',
  })
  role: UserRole;

  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: true,
    select: false,
  })
  active: boolean;

  @Column({
    type: 'boolean',
    default: false,
    select: true,
  })
  confirmed: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Booking, (booking) => booking.tour)
  bookings: Booking[];

  @ManyToMany(() => Tour, (tour) => tour.guides)
  tours: Tour[];

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
