import { GraphQLInputObjectType, GraphQLString } from "graphql";

const usersSearchType = new GraphQLInputObjectType({
  name: "UsersSearch",
  fields: {
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    countryCode: { type: GraphQLString },
  },
});

export default usersSearchType;
