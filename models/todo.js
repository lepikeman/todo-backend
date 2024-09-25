const { DataTypes, Model} = require("sequelize");
const sequelize = require("../config/database");

class Todo extends Model {}

Todo.init (
    {
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taskname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duedate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        urgent: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        todo_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: 'Todo',
        tableName: 'to_do',
    }
);
module.exports = Todo;