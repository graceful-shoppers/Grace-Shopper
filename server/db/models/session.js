const Sequelize = require('sequelize')
const db = require('../db')

//replicate the table created by connect-session-sequelize
const Session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000)
})

module.exports = Session
