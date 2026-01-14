import { GraphQLInt, GraphQLList } from "graphql";
import userType from "../types/user/userType.js";
import database from "../../database/database.js";
import usersSearchType from "../types/user/usersSearchType.js";
import validatePageable from "../utils/validatePageable.js";
import { Op } from "sequelize";
import checkRoles from "../utils/checkRoles.js";
import { Roles } from "../../database/models/role.js";

const usersQueryResolver = async (parent, data, context, info) => {
  await checkRoles(context.userId, [Roles.Admin, Roles.Audit]);
  validatePageable(data);

  const where = {};
  if (data.searchCriteria?.email) {
    where.email = { [Op.like]: `%${data.searchCriteria.email}%` };
  }
  if (data.searchCriteria?.firstName) {
    where.firstName = { [Op.like]: `%${data.searchCriteria.firstName}%` };
  }
  if (data.searchCriteria?.lastName) {
    where.lastName = { [Op.like]: `%${data.searchCriteria.lastName}%` };
  }

  const include = [];
  if (data.searchCriteria?.countryCode) {
    include.push({
      model: database.Country,
      as: "Country",
      where: { code: { [Op.like]: `%${data.searchCriteria.countryCode}%` } },
      required: false,
    });
  }

  const users = await database.User.findAll({
    limit: data.pageSize,
    offset: data.page * data.pageSize,
    where,
    include,
  });

  return users;
};

const usersQuery = {
  type: new GraphQLList(userType),
  args: {
    page: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    searchCriteria: { type: usersSearchType },
  },
  resolve: usersQueryResolver,
};

export default usersQuery;
