import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from "graphql";

const AccountCloseInputType = new GraphQLInputObjectType({
  name: "AccountCloseInput",
  fields: {
    closingAccountId: { type: new GraphQLNonNull(GraphQLInt) },
    transferAccountId: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export default AccountCloseInputType;
