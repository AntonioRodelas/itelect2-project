'use strict';

const now = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users', [
      { name: 'Alice Smith', email: 'alice@example.com', createdAt: now, updatedAt: now },
      { name: 'Bob Jones', email: 'bob@example.com', createdAt: now, updatedAt: now }
    ]);

    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const getIdOf = (name) => users.find((u) => u.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Finish GT3', completed: true, userId: getIdOf('Alice Smith'), createdAt: now, updatedAt: now },
      { title: 'Finish GT4', completed: true, userId: getIdOf('Alice Smith'), createdAt: now, updatedAt: now },
      { title: 'Finish GT5', completed: false, userId: getIdOf('Bob Jones'), createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};