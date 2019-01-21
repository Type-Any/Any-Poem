import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Comment from "./Comment";
import User from "./User";

@Entity()
class Poem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, poet => poet.poems)
  poet: User;

  @Column({ type: "text", nullable: false })
  title: string;

  @Column({ type: "text", nullable: false })
  text: string;

  @OneToMany(type => Comment, comment => comment.poem)
  comments: Comment[];

  @ManyToMany(type => User)
  @JoinTable()
  likes: User[];

  @Column({ type: "boolean", nullable: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Poem;
