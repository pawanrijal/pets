"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      // expense categories
      {
        id: 1,
        title: "Housing",
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
        title: "Entertainment",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        title: "Health",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        title: "Education",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        title: "Debt payments",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        title: "Miscellaneous",
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
        title: "Investment income",
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
        title: "Gifts/inheritances",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 12,
        title: "Retirement income",
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
