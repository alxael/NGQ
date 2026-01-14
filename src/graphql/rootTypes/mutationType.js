import { GraphQLObjectType } from "graphql";
import loginMutation from "../mutations/loginMutation.js";
import signupMutation from "../mutations/signupMutation.js";

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    login: loginMutation,
    signup: signupMutation,
  }),
});

export default mutationType;
