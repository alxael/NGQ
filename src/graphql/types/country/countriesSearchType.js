import { GraphQLInputObjectType, GraphQLString } from "graphql";

const countriesSearchType = new GraphQLInputObjectType({
  name: "CountriesSearch",
  fields: {
    name: { type: GraphQLString },
    code: { type: GraphQLString },
  },
});

export default countriesSearchType;
