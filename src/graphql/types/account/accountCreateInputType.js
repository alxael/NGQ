import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const AccountCreateInputType = new GraphQLInputObjectType({
  name: "AccountCreateInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export default AccountCreateInputType;
