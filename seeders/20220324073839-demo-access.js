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
    await queryInterface.bulkInsert(
      "accesses",
      [
        {
          role_id: 1, // admin
          module_priviledge_id: 1, // to create user
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 2, // to read user
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 3, // to update user
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 4, // to delete user
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          role_id: 1, // admin
          module_priviledge_id: 5, // to create role
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 6, // to read role
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 7, // to update role
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 8, // to delete role
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          role_id: 1, // admin
          module_priviledge_id: 9, // to create module
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 10, // to read module
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 11, // to update module
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 12, // to delete module
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          role_id: 1, // admin
          module_priviledge_id: 13, // to create access
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 14, // to read access
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 15, // to update access
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 16, // to delete access
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          role_id: 1, // admin
          module_priviledge_id: 17, // to create party
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 18, // to read party
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 19, // to update party
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 1, // admin
          module_priviledge_id: 20, // to delete party
          created_at: new Date(),
          updated_at: new Date(),
        },


        {
          role_id: 2, // customer
          module_priviledge_id: 17, // to create party
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 2, // customer
          module_priviledge_id: 18, // to read party
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 2, // customer
          module_priviledge_id: 19, // to update party
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_id: 2, // customer
          module_priviledge_id: 20, // to delete party
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("access", null, {});
  },
};
