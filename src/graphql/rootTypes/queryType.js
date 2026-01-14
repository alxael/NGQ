import { GraphQLObjectType } from "graphql";
import userQuery from "../queries/userQuery.js";
import usersQuery from "../queries/usersQuery.js";
import countriesQuery from "../queries/countriesQuery.js";
import rolesQuery from "../queries/rolesQuery.js";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: userQuery,
    users: usersQuery,
    countries: countriesQuery,
    roles: rolesQuery,
  }),
});

export default queryType;
