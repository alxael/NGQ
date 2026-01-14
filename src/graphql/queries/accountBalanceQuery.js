import database from "../../database/database.js";
import accountBalanceInputType from "../types/reports/accountBalanceInputType.js";
import accountBalanceType from "../types/reports/accountBalanceType.js";
import checkRoles from "../utils/checkRoles.js";
import { Roles } from "../../database/models/role.js";
import { userOwnsAccount } from "../services/accountService.js";

const accountBalanceQueryResolver = async (
  parent,
  { searchCriteria },
  context
) => {
  await checkRoles(context.userId, [Roles.User]);

  const { accountId, startDate, endDate } = searchCriteria;
  if (!accountId || !startDate || !endDate) {
    throw new Error("accountId, startDate, and endDate required");
  }

  await userOwnsAccount(context.userId, accountId);

  const [inboundResult, outboundResult] = await Promise.all([
    database.sequelize.query(
      `
      SELECT COALESCE(SUM(amount), 0) as total
      FROM Transactions 
      WHERE inboundAccountId = :accountId 
      AND transactionDate BETWEEN :startDate AND :endDate
    `,
      {
        replacements: { accountId, startDate, endDate },
        type: database.sequelize.QueryTypes.SELECT,
      }
    ),
    database.sequelize.query(
      `
      SELECT COALESCE(SUM(amount), 0) as total
      FROM Transactions 
      WHERE outboundAccountId = :accountId 
      AND transactionDate BETWEEN :startDate AND :endDate
    `,
      {
        replacements: { accountId, startDate, endDate },
        type: database.sequelize.QueryTypes.SELECT,
      }
    ),
  ]);

  const inboundTotal = Number.parseFloat(inboundResult[0].total) || 0;
  const outboundTotal = Number.parseFloat(outboundResult[0].total) || 0;
  const netBalance = inboundTotal - outboundTotal;

  return {
    inboundTotal,
    outboundTotal,
    netBalance,
  };
};

const accountBalanceQuery = {
  type: accountBalanceType,
  args: {
    searchCriteria: { type: accountBalanceInputType },
  },
  resolve: accountBalanceQueryResolver,
};

export default accountBalanceQuery;
