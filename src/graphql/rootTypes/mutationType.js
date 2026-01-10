import { GraphQLObjectType } from "graphql";

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({}),
});

export default mutationType;