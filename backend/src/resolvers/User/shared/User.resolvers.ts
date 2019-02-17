import Comment from "../../../entities/Comment";
import Poem from "../../../entities/Poem";
import User from "../../../entities/User";

const resolvers = {
  User: {
    comments: async (root: any, args: any, ctx: any): Promise<Comment[] | null> => {
      try {
        const comments = await Comment.find({ where: { commenter: { id: root.id } } });
        if (comments.length > 0) {
          return comments;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    },
    followers: async (root: any, args: any, ctx: any): Promise<User[] | null> => {
      try {
        const user = await User.findOne({ where: { id: root.id }, relations: ["followers"] });
        if (user && user.followers.length > 0) {
          return user.followers;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    },
    following: async (root: any, args: any, ctx: any): Promise<User[] | null> => {
      try {
        const user = await User.findOne({ where: { id: root.id }, relations: ["following"] });
        if (user && user.following.length > 0) {
          return user.following;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    },
    poems: async (root: any, args: any, ctx: any): Promise<Poem[] | null> => {
      try {
        const poems = await Poem.find({ where: { poet: { id: root.id } } });
        if (poems.length > 0) {
          return poems;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    }
  }
};

export default resolvers;
