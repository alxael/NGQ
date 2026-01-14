import { GraphQLInt, GraphQLList } from "graphql";
import transactionType from "../types/transaction/transactionType.js";
import database from "../../database/database.js";
import transactionsSearchType from "../types/transaction/transactionsSearchType.js";
import validatePageable from "../utils/validatePageable.js";
import checkRoles from "../utils/checkRoles.js";
import { Roles } from "../../database/models/role.js";
import { userOwnsAccount } from "../services/accountService.js";
import { Op } from "sequelize";

const transactionsQueryResolver = async (parent, data, context) => {
  await checkRoles(context.userId, [Roles.User]);
  validatePageable(data);

  const { accountId } = data.searchCriteria;
  await userOwnsAccount(context.userId, accountId);

  const where = {
    [Op.or]: [
      { inboundAccountId: accountId },
      { outboundAccountId: accountId },
    ],
  };

  const transactions = await database.Transaction.findAll({
    where,
    limit: data.pageSize,
    offset: data.page * data.pageSize,
    order: [["transactionDate", "DESC"]],
    include: [
      { model: database.Account, as: "inboundAccount" },
      { model: database.Account, as: "outboundAccount" },
    ],
  });

  return transactions;
};

const transactionsQuery = {
  type: new GraphQLList(transactionType),
  args: {
    page: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    searchCriteria: { type: transactionsSearchType },
  },
  resolve: transactionsQueryResolver,
};

export default transactionsQuery;
