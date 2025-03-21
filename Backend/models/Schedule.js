const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize instance

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true // Nullable if slot is not booked
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true, // Nullable if slot is not booked
    validate: {
      isEmail: true
    }
  },
  status: {
    type: DataTypes.ENUM('available', 'booked', 'cancelled'),
    defaultValue: 'available'
  },
  subscribed_for_updates: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
});

module.exports = Schedule;
