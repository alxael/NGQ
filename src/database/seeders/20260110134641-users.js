export default {
  async up(queryInterface, Sequelize) {
    // password is "test"
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          countryId: 1,
          email: "admin@admin.com",
          firstname: "admin",
          lastname: "admin",
          password:
            "$2b$11$TlrbHYrHrK6xrj9ryBFejuEXS5qcUKzzxa083X7t91QKJdaZfThf2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          countryId: 2,
          email: "user@user.com",
          firstname: "user",
          lastname: "user",
          password:
            "$2b$11$TlrbHYrHrK6xrj9ryBFejuEXS5qcUKzzxa083X7t91QKJdaZfThf2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          countryId: 3,
          email: "audit@audit.com",
          firstname: "audit",
          lastname: "audit",
          password:
            "$2b$11$TlrbHYrHrK6xrj9ryBFejuEXS5qcUKzzxa083X7t91QKJdaZfThf2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      {
        email: ["admin@admin.com", "test@test.com"],
      },
      {}
    );
  },
};
