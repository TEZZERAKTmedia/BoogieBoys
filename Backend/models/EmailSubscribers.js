const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const EmailSubscribers = sequelize.define('EmailSubscribers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
},{
    timestamps: true,
});

module.exports = EmailSubscribers;