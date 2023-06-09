const {Model, DataTypes} = require('sequelize');
const {User} = require("./user.model");
const sequelize = require('../config/db.connection');

class List extends Model {
}

List.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'List',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

User.hasMany(List, {
    foreignKey: 'user_id'
})

List.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {List};
