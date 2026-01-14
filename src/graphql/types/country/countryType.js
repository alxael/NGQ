import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const countryType = new GraphQLObjectType({
  name: "Country",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
  },
});

export default countryType;
