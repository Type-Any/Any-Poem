import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "./resolvers/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "./resolvers/**/*.resolvers.*"));

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;
