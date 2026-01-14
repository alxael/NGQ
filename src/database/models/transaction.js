import { Model } from "sequelize";

const initializeTransaction = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Account, {
        as: "inboundAccount",
        foreignKey: "inboundAccountId",
      });
      Transaction.belongsTo(models.Account, {
        as: "outboundAccount",
        foreignKey: "outboundAccountId",
      });
    }
  }

  Transaction.init(
    {
      inboundAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      outboundAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "Transactions",
    }
  );

  return Transaction;
};
export default initializeTransaction;
