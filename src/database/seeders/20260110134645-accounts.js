export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "accounts",
      [
        {
          id: 1,
          userId: 1,
          iban: "RO83OPPCo1JNAQ8eEheih5zI",
          amount: 1000000,
          name: "The Bank",
          closed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "accounts",
      {
        iban: "RO83OPPCo1JNAQ8eEheih5zI",
      },
      {}
    );
  },
};
