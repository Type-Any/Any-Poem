import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Comment from "./Comment";
import Poem from "./Poem";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  @IsEmail()
  email: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  oauthId: string;

  @Column({ type: "text", nullable: false })
  fullName: string;

  @Column({ type: "text", nullable: false })
  penName: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(type => Poem, poem => poem.poet)
  poems: Poem[];

  @OneToMany(type => Comment, comment => comment.commenter)
  comments: Comment[];

  @ManyToMany(type => User, user => user.following)
  followers: User[];

  @ManyToMany(type => User, user => user.followers)
  @JoinTable()
  following: User[];

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public async setPassword(password: string): Promise<void> {
    const hashedPassword = await this.hashPassword(password);
    this.password = hashedPassword;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
