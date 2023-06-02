const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'library',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;
