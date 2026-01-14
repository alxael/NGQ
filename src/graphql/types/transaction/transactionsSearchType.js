import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql";

const transactionsSearchType = new GraphQLInputObjectType({
  name: "TransactionsSearchType",
  fields: {
    accountId: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export default transactionsSearchType;
