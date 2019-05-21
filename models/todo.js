'use strict'
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      name: DataTypes.STRING,
      done: DataTypes.BOOLEAN
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  )
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return Todo
}
