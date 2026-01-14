import database from "../../database/database.js";

export const userOwnsAccount = async (userId, accountId, transaction) => {
  const account = await database.Account.findByPk(accountId, { transaction });
  if (!account) {
    throw new Error("Account not found!");
  }
  if (account.userId !== Number.parseInt(userId)) {
    throw new Error("User does not own the account!");
  }
};
