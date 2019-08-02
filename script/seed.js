'use strict'
const faker = require('faker')
const db = require('../server/db')
const {
  User,
  Product,
  Order,
  ProductOrder,
  Review,
  Session
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //create users
  const users = []
  for (let i = 0; i < 50; i++) {
    users.push(
      await User.create({
        email: faker.internet.email(),
        password: 'shovels',
        isAdmin: faker.random.boolean()
      })
    )
  }

  //create products
  const products = []
  const categories = [
    'snowShovel',
    'yardShovel',
    'kitchenShovel',
    'mouthShovel'
  ]
  let totalCat = categories.length
  let randIndex = function(arr) {
    return Math.floor(Math.random() * arr.length)
  }

  let randomArr = function() {
    let arr = []
    for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
      const cata = categories[randIndex(categories)]
      if (!arr.includes(cata)) {
        arr.push(cata)
      }
    }
    return arr
  }

  for (let i = 0; i < 200; i++) {
    products.push(
      await Product.create({
        title: faker.lorem.word(),
        price: faker.random.number(),
        category: randomArr(),
        imageUrl: faker.random.image(),
        description: faker.company.catchPhraseDescriptor(),
        quantity: Math.floor(Math.random() * 9)
      })
    )
  }
  //create sessions

  const sessArr = []

  for (let i = 0; i < 20; i++) {
    const what = await Session.create({
      sid: faker.random.uuid()
    })
    sessArr.push(what.dataValues.sid)
  }

  //create orders
  const orders = []
  const status = ['Created', 'Processing', 'Cancelled', 'Completed']

  for (let i = 0; i < 100; i++) {
    let what = await Order.findOrCreate({
      where: {
        status: status[randIndex(status)],
        subtotal: null,
        userId: randIndex(users) + 1
      }
    })
    let hah = await Order.findOrCreate({
      where: {
        status: status[randIndex(status)],
        subtotal: null,
        sid: sessArr[randIndex(sessArr)]
      }
    })
  }

  //create productOrder
  const prodOrd = []
  const orderArr = await Order.findAll()
  for (let i = 0; i <= 100; i++) {
    await ProductOrder.findOrCreate({
      where: {
        orderId: Math.floor(Math.random() * orderArr.length + 1),
        productId: randIndex(products) + 1
      },
      defaults: {
        price: products[randIndex(products)].dataValues.price,
        quantity: Math.floor(Math.random() * 10)
      }
    })
  }

  //create reviews

  for (let i = 0; i < 500; i++) {
    await Review.create({
      text: faker.lorem.sentences(),
      rating: Math.floor(Math.random() * 5) + 1,
      userId: randIndex(users) + 1,
      productId: randIndex(products) + 1
    })
  }

  // await Review.create({
  //   text: 'its really cool',
  //   rating: 3,
  //   userId: 1,
  //   productId: 1
  // })

  console.log(`seeded ${users.length} users and ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
