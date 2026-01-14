import database from "../../database/database.js";
import { Roles } from "../../database/models/role.js";
import checkRoles from "../utils/checkRoles.js";
import { generateIban } from "../services/ibanService.js";
import accountType from "../types/account/accountType.js";
import AccountCreateInputType from "../types/account/accountCreateInputType.js";
import dotenv from "dotenv";

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || "development"}`,
});

const accountCreateMutationResolver = async (parent, args, context, info) => {
  await checkRoles(context.userId, [Roles.User]);

  const user = await database.User.findByPk(context.userId, {
    include: database.Country,
  });

  const iban = generateIban(user.Country);

  const account = await database.Account.create({
    userId: user.id,
    iban,
    amount: 0,
    name: args.account.name,
    closed: false,
  });

  return account;
};

const accountCreateMutation = {
  type: accountType,
  args: {
    account: { type: AccountCreateInputType },
  },
  resolve: accountCreateMutationResolver,
};

export default accountCreateMutation;
