import { GraphQLList } from "graphql";
import database from "../../database/database.js";
import checkRoles from "../utils/checkRoles.js";
import { AllRoles } from "../../database/models/role.js";
import roleType from "../types/role/roleType.js";

const rolesQueryResolver = async (parent, args, context, info) => {
  await checkRoles(context.userId, AllRoles);

  const roles = await database.Role.findAll();

  return roles;
};

const rolesQuery = {
  type: new GraphQLList(roleType),
  resolve: rolesQueryResolver,
};

export default rolesQuery;
