import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import countryType from "../country/countryType.js";
import roleType from "../role/roleType.js";

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
    roles: {
      type: new GraphQLList(roleType),
      resolve: async (user) => {
        const roles = await user.getRoles();
        return roles;
      },
    },
  },
});

export default userType;
