const User = require('./user')
const Order = require('./Order')
const Product = require('./Product')
const Review = require('./review')
const ProductOrder = require('./product_order')
const Session = require('./session')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Product)
Product.hasMany(Review)

Order.belongsToMany(Product, {through: ProductOrder})

Product.belongsToMany(Order, {through: ProductOrder})

Order.belongsTo(Session, {foreignKey: 'sid'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Product,
  Review,
  ProductOrder,
  Session
}
