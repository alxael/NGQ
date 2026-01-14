import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
} from "graphql";

const accountType = new GraphQLObjectType({
  name: "Account",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    iban: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export default accountType;
