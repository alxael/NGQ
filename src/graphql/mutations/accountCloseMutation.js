import database from "../../database/database.js";
import { Roles } from "../../database/models/role.js";
import checkRoles from "../utils/checkRoles.js";
import accountType from "../types/account/accountType.js";
import AccountCloseInputType from "../types/account/accountCloseInputType.js";
import { userOwnsAccount } from "../services/accountService.js";

const accountCloseMutationResolver = async (parent, args, context, info) => {
  await checkRoles(context.userId, [Roles.User, Roles.Audit]);

  await userOwnsAccount(context.userId, args.account.closingAccountId);
  await userOwnsAccount(context.userId, args.account.transferAccountId);

  const closingAccount = await database.Account.findByPk(
    args.account.closingAccountId
  );
  const transferAccount = await database.Account.findByPk(
    args.account.transferAccountId
  );

  if (closingAccount.closed) {
    throw new Error("Account is already closed!");
  }

  if (transferAccount.closed) {
    throw new Error("Transfer account is closed!");
  }

  transferAccount.amount += closingAccount.amount;
  closingAccount.amount = 0;
  closingAccount.closed = true;

  await transferAccount.save();
  await closingAccount.save();

  return closingAccount;
};

const accountCloseMutation = {
  type: accountType,
  args: {
    account: { type: AccountCloseInputType },
  },
  resolve: accountCloseMutationResolver,
};

export default accountCloseMutation;
