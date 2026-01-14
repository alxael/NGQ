import { GraphQLObjectType, GraphQLFloat } from "graphql";

const accountBalanceType = new GraphQLObjectType({
  name: "AccountBalance",
  fields: {
    inboundTotal: { type: GraphQLFloat },
    outboundTotal: { type: GraphQLFloat },
    netBalance: { type: GraphQLFloat },
  },
});
export default accountBalanceType;
