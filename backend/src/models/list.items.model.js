const { Model, DataTypes } = require('sequelize');
const { List } = require('./list.model');
const sequelize = require('../config/db.connection');

class ListItem extends Model {}

ListItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'ListItems',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

ListItem.belongsTo(List, { foreignKey: 'list_id' });
List.hasMany(ListItem, { foreignKey: 'list_id' });

module.exports = { ListItem };
