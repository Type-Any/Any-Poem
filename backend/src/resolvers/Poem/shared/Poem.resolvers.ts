import Comment from "../../../entities/Comment";
import Poem from "../../../entities/Poem";
import User from "../../../entities/User";

const resolvers = {
  Poem: {
    comments: async (root: any, args: any, ctx: any): Promise<Comment[] | null> => {
      try {
        const poem = await Poem.findOne({ id: root.id });
        if (poem && poem.comments) {
          return poem.comments;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    likes: async (root: any, args: any, ctx: any): Promise<User[] | null> => {
      try {
        const poem = await Poem.findOne({ id: root.id });
        if (poem && poem.likes) {
          return poem.likes;
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    poet: async (root: any, args: any, ctx: any): Promise<User | null> => {
      try {
        const poem = await Poem.findOne({ id: root.id });
        if (poem && poem.poet) {
          return poem.poet;
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
