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
        "module_priviledges",
        [
          {
            id: 1,
            module_id: 1, // user
            privilege_id: 1, // create
              created_at: new Date(),
            updated_at: new Date(),

          },
          {
            id: 2,
            module_id: 1, // user
            privilege_id: 2, // read
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 3,
            module_id: 1, // user
            privilege_id: 3, // update
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 4,
            module_id: 1, // user
            privilege_id: 4, // delete
              created_at: new Date(),
            updated_at: new Date(),
          },


          {
            id: 5,
            module_id: 2, // role
            privilege_id: 1, // create
              created_at: new Date(),
            updated_at: new Date(),

          },
          {
            id: 6,
            module_id: 2, // role
            privilege_id: 2, // read
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 7,
            module_id: 2, // role
            privilege_id: 3, // update
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 8,
            module_id: 2, // role
            privilege_id: 4, // delete
              created_at: new Date(),
            updated_at: new Date(),
          },


          {
            id:9,
            module_id: 3, // module
            privilege_id: 1, // create
              created_at: new Date(),
            updated_at: new Date(),

          },
          {
            id:10,
            module_id: 3, // module
            privilege_id: 2, // read
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:11,
            module_id: 3, // module
            privilege_id: 3, // update
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:12,
            module_id: 3, // module
            privilege_id: 4, // delete
              created_at: new Date(),
            updated_at: new Date(),
          },

          {
            id:13,
            module_id: 4, // access
            privilege_id: 1, // create
              created_at: new Date(),
            updated_at: new Date(),

          },
          {
            id:14,
            module_id: 4, // access
            privilege_id: 2, // read
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:15,
            module_id: 4, // access
            privilege_id: 3, // update
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:16,
            module_id: 4, // access
            privilege_id: 4, // delete
              created_at: new Date(),
            updated_at: new Date(),
          },

          {
            id:17,
            module_id: 5, // party
            privilege_id: 1, // create
              created_at: new Date(),
            updated_at: new Date(),

          },
          {
            id:18,
            module_id: 5, // party
            privilege_id: 2, // read
              created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:19,
            module_id: 5, // party
            privilege_id: 3, // update
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id:20,
            module_id: 5, // party
            privilege_id: 4, // delete
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
    await queryInterface.bulkDelete("module_privilege", null, {});
  },
};
