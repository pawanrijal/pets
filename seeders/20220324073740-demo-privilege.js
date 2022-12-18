"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("privileges", [
      {
        id: 1,
        name: "Create",
        method: "POST",
        description:"",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Read",
        method: "GET",
        description:"",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "Update",
        method: "PUT",
        description:"",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: "Delete",
        method: "DELETE",
        description:"",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("privileges", null, {});
  },
};
