const Sequelize = require('sequelize')
const db = require('../db')
const {Order} = require('../index')

//replicate the table created by connect-session-sequelize
const Session = db.define('Session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000)
})

Session.getCart = async function() {
  console.log('asdhfasdhfahsdfhasdfhahdfahsdfhasdf')
}

// Session.createCart = function () {

// }

module.exports = Session
