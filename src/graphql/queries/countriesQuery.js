import { GraphQLInt, GraphQLList } from "graphql";
import database from "../../database/database.js";
import countryType from "../types/country/countryType.js";
import validatePageable from "../utils/validatePageable.js";
import countriesSearchType from "../types/country/countriesSearchType.js";
import { Op } from "sequelize";
import checkRoles from "../utils/checkRoles.js";
import { AllRoles } from "../../database/models/role.js";

const countriesQueryResolver = async (parent, args, context, info) => {
  await checkRoles(context.userId, AllRoles);
  validatePageable(args);

  const where = {};
  if (args.searchCriteria?.name) {
    where.name = { [Op.like]: `%${args.searchCriteria.name}%` };
  }
  if (args.searchCriteria?.code) {
    where.code = { [Op.like]: `%${args.searchCriteria.code}%` };
  }

  const countries = await database.Country.findAll({
    limit: args.pageSize,
    offset: args.page * args.pageSize,
    where,
  });

  return countries;
};

const countriesQuery = {
  type: new GraphQLList(countryType),
  args: {
    page: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    searchCriteria: { type: countriesSearchType },
  },
  resolve: countriesQueryResolver,
};

export default countriesQuery;
