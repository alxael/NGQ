import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const signupInputType = new GraphQLInputObjectType({
  name: "SignupInput",
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    countryCode: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export default signupInputType;
