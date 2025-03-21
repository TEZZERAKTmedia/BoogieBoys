const { Sequelize} = require('sequelize');
const sequelize = require('../config/database');


const Schedule = require('./Schedule');
const EmailSubscribers = require('./EmailSubscribers');


const db = { 
    sequelize,
    Sequelize,
    Schedule,
    EmailSubscribers
};


module.exports = db;