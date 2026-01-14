import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
} from "graphql";

const transactionCreateInputType = new GraphQLInputObjectType({
  name: "TransactionCreateInput",
  fields: {
    outboundAccountId: { type: new GraphQLNonNull(GraphQLInt) },
    inboundAccountIban: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    description: { type: GraphQLString },
  },
});

export default transactionCreateInputType;
