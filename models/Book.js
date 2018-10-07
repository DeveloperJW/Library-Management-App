/**
 * title: string
 * genre:string
 * year:integer
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
  const Book = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: "Title is required"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: "Author is required"
        }
      }
    },
    genre: DataTypes.STRING,
    year:DataTypes.INTEGER,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Book;
};