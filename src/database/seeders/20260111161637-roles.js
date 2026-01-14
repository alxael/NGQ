import { Roles } from "../models/role.js";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        { id: 1, name: Roles.Admin },
        {
          id: 2,
          name: Roles.User,
        },
        {
          id: 3,
          name: Roles.Audit,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
