import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  LEAD_GUIDE = 'lead-guide',
  GUIDE = 'guide',
}
@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({
    description: 'Primary key as User ID',
    example: 'aca8489d-71a9-45fe-ba8b-fc30da0ec558',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User name', example: 'Elon Musk' })
  @Column({
    type: 'varchar',
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'elon@yopmail.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'User phot url link',
    example: 'cloudinary.com/tours/eijdi3e3ie9',
  })
  @Column({
    default: 'default.jpg',
  })
  photo: string;

  @ApiProperty({
    description: 'User role',
    example: 'user',
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: 'user',
  })
  role: UserRole | string;

  @ApiProperty({
    description: 'Hashed user password',
  })
  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @ApiProperty({
    description: 'User active state',
    example: 'active',
  })
  @Column({
    type: 'boolean',
    default: true,
    select: false,
  })
  active: boolean;

  @ApiProperty({
    description: 'User confirmation state',
    example: false,
  })
  @Column({
    type: 'boolean',
    default: false,
    select: true,
  })
  confirmed: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @ManyToMany(() => Tour, (tour) => tour.guides)
  tours: Tour[];

  @ApiProperty({ description: 'When user was created', type: Date })
  @CreateDateColumn()
  created_at: Timestamp;

  @ApiProperty({ description: 'When user was updated', type: Date })
  @UpdateDateColumn()
  updated_at: Timestamp;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
