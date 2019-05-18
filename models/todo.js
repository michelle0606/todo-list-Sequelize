'use strict'
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      name: DataTypes.STRING,
      done: DataTypes.BOOLEAN
    },
    {}
  )
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return Todo
}
