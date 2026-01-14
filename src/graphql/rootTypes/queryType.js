import { GraphQLObjectType } from "graphql";
import userQuery from "../queries/userQuery.js";
import usersQuery from "../queries/usersQuery.js";
import countriesQuery from "../queries/countriesQuery.js";
import rolesQuery from "../queries/rolesQuery.js";
import accountsQuery from "../queries/accountsQuery.js";
import transactionsQuery from "../queries/transactionsQuery.js";
import accountBalanceQuery from "../queries/accountBalanceQuery.js";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: userQuery,
    users: usersQuery,
    countries: countriesQuery,
    roles: rolesQuery,
    accounts: accountsQuery,
    transactions: transactionsQuery,
    accountBalance: accountBalanceQuery,
  }),
});

export default queryType;
