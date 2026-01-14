import { GraphQLObjectType } from "graphql";
import loginMutation from "../mutations/loginMutation.js";
import signupMutation from "../mutations/signupMutation.js";
import accountCreateMutation from "../mutations/accountCreateMutation.js";
import accountCloseMutation from "../mutations/accountCloseMutation.js";
import createTransactionMutation from "../mutations/transactionCreateMutation.js";

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    login: loginMutation,
    signup: signupMutation,
    createAccount: accountCreateMutation,
    closeAccount: accountCloseMutation,
    createTransaction: createTransactionMutation,
  }),
});

export default mutationType;
