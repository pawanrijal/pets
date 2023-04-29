"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      // expense categories
      {
        id: 1,
        title: "Housing (rent/mortgage, utilities, property taxes, repairs)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "Transportation",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        title: "Transportation",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        title: "Entertainment",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        title: "Health",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        title: "Education",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        title: "Debt payments (credit card bills, loans)",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // income categories
      {
        id: 8,
        title: "Salary",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        title: "Investment income (dividends, capital gains, interest)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        title: "Rental income",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 11,
        title: "Gifts/inheritances (unexpected income from family or friends)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 12,
        title: "Retirement income (social security, pensions, annuities)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 13,
        title: "Miscellaneous",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
