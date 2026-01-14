import { Model } from "sequelize";

const initializeRole = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {}
  }

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Roles",
      timestamps: false,
    }
  );
  return Role;
};
export default initializeRole;

export const Roles = {
  Admin: "admin",
  User: "user",
  Audit: "audit",
};

export const AllRoles = Object.values(Roles);
