export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("countries", [
      {
        id: 1,
        name: "Romania",
        code: "RO",
        ibanPattern: "aaaacccccccccccccccc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "France",
        code: "FR",
        ibanPattern: "nnnnnnnnnncccccccccccnn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Germany",
        code: "GR",
        ibanPattern: "nnnnnnnnnnnnnnnnnn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Italy",
        code: "IT",
        ibanPattern: "annnnnnnnnncccccccccccc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "United Kingdom",
        code: "GB",
        ibanPattern: "aaaannnnnnnnnnnnnn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "countries",
      {
        id: [1, 2, 3, 4, 5],
      },
      {}
    );
  },
};
