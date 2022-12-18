'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users',[{
      id: 1,
      username: "pawan",
      password: "$2b$10$ZFpfY4F/1dy0z1.sqd/.ueNrDqcbk6etJnOhuh8kgkB1GlnUTbakq",
      profile_pic: null,
      email: "pwnrijal@gmail.com",
      role_id:1,
      created_at: new Date(),
      updated_at: new Date(),

    },
      {
        id: 2,
        username: "Ram",
        password: "$2b$10$ZFpfY4F/1dy0z1.sqd/.ueNrDqcbk6etJnOhuh8kgkB1GlnUTbakq",
        profile_pic: null,
        email: "ram@gmail.com",

        created_at: new Date(),
        updated_at: new Date(),

      },
      {
        id: 3,
        username: "Shyam",
        password: "$2b$10$ZFpfY4F/1dy0z1.sqd/.ueNrDqcbk6etJnOhuh8kgkB1GlnUTbakq",
        email: "shyam@gmail.com",

        created_at: new Date(),
        updated_at: new Date(),

      },
      {
        id: 4,
        username: "Hari",
        password: "$2b$10$ZFpfY4F/1dy0z1.sqd/.ueNrDqcbk6etJnOhuh8kgkB1GlnUTbakq",
        profile_pic: null,
        email: "hari@gmail.com",

        created_at: new Date(),
        updated_at: new Date(),

      }
    ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
