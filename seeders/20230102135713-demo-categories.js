'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        "id": 1,
        "title": "Household Items",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        "id": 2,
        "title": "House repair/maintenance",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        "id": 3,
        "title": "Loans/Advances given",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        "id": 4,
        "title": "Repayment of loans/advances",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        "id": 5,
        "title": "Deposit to bank account",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        "id": 6,
        "title": "Real Estate Investment",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        "id": 7,
        "title": "Vehicle and Machineries",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        "id": 7,
        "title": "Food",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
