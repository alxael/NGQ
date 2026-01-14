import { DataTypes } from "sequelize";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserRoles", {
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        primaryKey: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: { model: "Roles", key: "id" },
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserRoles");
  },
};
