import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
} from "graphql";
import accountType from "../account/accountType.js";

const transactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: {
    id: { type: GraphQLInt },
    inboundAccount: { type: accountType },
    outboundAccount: { type: accountType },
    amount: { type: GraphQLFloat },
    transactionDate: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export default transactionType;
