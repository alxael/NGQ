import { GraphQLSchema } from "graphql";
import queryType from "./rootTypes/queryType.js";
import mutationType from "./rootTypes/mutationType.js";

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export default schema;
