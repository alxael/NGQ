import { GraphQLInputObjectType, GraphQLString } from "graphql";

const accountSearchType = new GraphQLInputObjectType({
  name: "AccountSearchType",
  fields: {
    name: { type: GraphQLString },
  },
});

export default accountSearchType;
