'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '$2a$10$e8R45PlaceholderForExistingUsers'
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'member'
    });

    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'users_email_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'users_email_unique');
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'password');
  }
};