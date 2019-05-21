'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    }
  )
  User.associate = function(models) {
    User.hasMany(models.Todo, { foreignKey: 'userId' })
  }
  return User
}
