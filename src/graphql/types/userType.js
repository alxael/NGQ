import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import countryType from "./countryType.js";

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    country: {
      type: countryType,
      resolve: async (user) => {
        const country = await user.getCountry();
        return country;
      },
    },
  },
});

export default userType;
