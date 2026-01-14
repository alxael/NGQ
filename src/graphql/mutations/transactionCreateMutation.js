import database from "../../database/database.js";
import { Roles } from "../../database/models/role.js";
import checkRoles from "../utils/checkRoles.js";
import { userOwnsAccount } from "../services/accountService.js";
import transactionType from "../types/transaction/transactionType.js";
import transactionCreateInputType from "../types/transaction/transactionCreateInputType.js";

const createTransactionMutationResolver = async (
  parent,
  args,
  context,
  info
) => {
  await checkRoles(context.userId, [Roles.User]);

  const { outboundAccountId, inboundAccountIban, amount, description } =
    args.transaction;

  if (!amount || amount <= 0) {
    throw new Error("Amount must be positive");
  }

  return database.sequelize.transaction(async (t) => {
    await userOwnsAccount(context.userId, outboundAccountId);

    const outboundAccount = await database.Account.findByPk(outboundAccountId, {
      transaction: t,
    });
    if (!outboundAccount) {
      throw new Error(
        `Outbound account with ID ${outboundAccountId} not found`
      );
    }

    if (outboundAccount.amount < amount) {
      throw new Error(
        `Insufficient funds. Available: ${outboundAccount.amount}`
      );
    }

    if (outboundAccount.closed) {
      throw new Error("Outbound account is closed");
    }

    const inboundAccount = await database.Account.findOne({
      where: { iban: inboundAccountIban },
      transaction: t,
    });
    if (!inboundAccount) {
      throw new Error(
        `Inbound account with IBAN ${inboundAccountIban} not found`
      );
    }
    if (inboundAccount.closed) {
      throw new Error("Inbound account is closed");
    }

    await outboundAccount.reload({ transaction: t });
    await inboundAccount.reload({ transaction: t });

    await outboundAccount.decrement("amount", { by: amount, transaction: t });
    await inboundAccount.increment("amount", { by: amount, transaction: t });

    const transaction = await database.Transaction.create(
      {
        inboundAccountId: inboundAccount.id,
        outboundAccountId: outboundAccount.id,
        amount,
        transactionDate: new Date(),
        description,
      },
      {
        transaction: t,
      }
    );

    const transactionWithAccounts = await database.Transaction.findByPk(
      transaction.id,
      {
        include: [
          { model: database.Account, as: "inboundAccount" },
          { model: database.Account, as: "outboundAccount" },
        ],
        transaction: t,
      }
    );

    return transactionWithAccounts;
  });
};

const createTransactionMutation = {
  type: transactionType,
  args: {
    transaction: { type: transactionCreateInputType },
  },
  resolve: createTransactionMutationResolver,
};

export default createTransactionMutation;
