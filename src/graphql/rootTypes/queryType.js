import { GraphQLObjectType } from "graphql";
import userQuery from "../queries/userQuery.js";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: userQuery,
  }),
});

export default queryType;
