import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const roleType = new GraphQLObjectType({
  name: "Role",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

export default roleType;
