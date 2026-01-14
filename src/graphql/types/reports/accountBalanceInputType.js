import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from 'graphql';

const accountBalanceInputType = new GraphQLInputObjectType({
  name: 'AccountBalanceInput',
  fields: {
    accountId: { type: GraphQLInt },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
  },
});
export default accountBalanceInputType;
