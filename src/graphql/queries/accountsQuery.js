import { GraphQLList } from "graphql";
import database from "../../database/database.js";
import accountType from "../types/account/accountType.js";
import accountSearchType from "../types/account/accountSearchType.js";
import validatePageable from "../utils/validatePageable.js";
import { Op } from "sequelize";
import checkRoles from "../utils/checkRoles.js";
import { Roles } from "../../database/models/role.js";

const accountsQueryResolver = async (parent, args, context, info) => {
  await checkRoles(context.userId, [Roles.User]);
  validatePageable(args);

  const where = {
    closed: false,
  };
  if (args.searchCriteria?.name) {
    where.name = { [Op.like]: `%${args.searchCriteria.name}%` };
  }

  const accounts = await database.Account.findAll({
    where,
  });

  return accounts;
};

const accountsQuery = {
  type: new GraphQLList(accountType),
  args: {
    searchCriteria: { type: accountSearchType },
  },
  resolve: accountsQueryResolver,
};

export default accountsQuery;
