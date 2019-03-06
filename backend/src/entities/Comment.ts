import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Poem from "./Poem";
import User from "./User";

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, commenter => commenter.comments)
  commenter: User;

  @ManyToOne(type => Poem, poem => poem.comments)
  poem: Poem;

  @Column({ type: "text", nullable: false })
  text: string;

  @ManyToMany(type => User)
  @JoinTable()
  likes: User[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Comment;
