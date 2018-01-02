// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var article = sequelize.define('article', {
//     title: DataTypes.STRING,
//     author: DataTypes.STRING,
//     content: DataTypes.TEXT
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });
//   return article;
// };
// 
// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('articles', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       title: {
//         type: Sequelize.STRING
//       },
//       author: {
//         type: Sequelize.STRING
//       },
//       content: {
//         type: Sequelize.TEXT
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('articles');
//   }
// };
