import Comment from "../../../entities/Comment";
import Poem from "../../../entities/Poem";
import User from "../../../entities/User";

const resolvers = {
  Comment: {
    children: async (root: any, args: any, ctx: any): Promise<Comment[] | null> => {
      try {
        const comment = await Comment.findOne({ where: { id: root.id }, relations: ["children"] });
        if (comment) {
          return comment.children;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    commenter: async (root: any, args: any, ctx: any): Promise<User | null> => {
      try {
        const comment = await Comment.findOne({ where: { id: root.id }, relations: ["commenter"] });
        if (comment) {
          return comment.commenter;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    likes: async (root: any, args: any, ctx: any): Promise<User[] | null> => {
      try {
        const comment = await Comment.findOne({ where: { id: root.id }, relations: ["likes"] });
        if (comment) {
          return comment.likes;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    parent: async (root: any, args: any, ctx: any): Promise<Comment | null> => {
      try {
        const comment = await Comment.findOne({ where: { id: root.id }, relations: ["parent"] });
        if (comment && comment.parent) {
          return comment.parent;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    poem: async (root: any, args: any, ctx: any): Promise<Poem | null> => {
      try {
        const comment = await Comment.findOne({ where: { id: root.id }, relations: ["poem"] });
        if (comment) {
          return comment.poem;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    }
  }
};

export default resolvers;
