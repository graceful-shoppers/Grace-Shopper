/* eslint-disable max-statements */
/* eslint-disable handle-callback-err */
'use strict'
const faker = require('faker')
const fs = require('fs')
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

  let randIndex = function(arr) {
    return Math.floor(Math.random() * arr.length)
  }

  // create users
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

  const adminUser = await User.create({
    emai: 'disney@world.com',
    password: '1234',
    isAdmin: true
  })

  //create products
  let products = []

  function dirReader() {
    return fs.readdirSync(
      __dirname + '/../shoveler/apify_storage/datasets/default',
      'utf8'
    )
  }

  function fileReader(fileArr) {
    return fileArr.map(file => {
      const data = fs.readFileSync(
        __dirname + `/../shoveler/apify_storage/datasets/default/${file}`
      )
      products.push(JSON.parse(data))
    })
  }

  fileReader(dirReader())

  products = await Promise.all(
    await products.map(async prod => {
      try {
        if (prod.quantity === 0) {
          prod.availability = false
        }
        const addedProd = await Product.create(prod)
        return addedProd
      } catch (err) {
        console.error(err)
      }
    })
  )

  // create sessions

  const sessArr = []

  for (let i = 0; i < 20; i++) {
    const what = await Session.create({
      sid: faker.random.uuid()
    })
    sessArr.push(what.dataValues.sid)
  }

  //create orders
  const orders = []
  const nonCartStatus = ['Processing', 'Cancelled', 'Completed']

  for (let i = 0; i < 100; i++) {
    let randiUser = randIndex(users) + 1
    const userOrder = await Order.findOne({
      where: {
        userId: randiUser,
        status: 'Created'
      }
    })
    let userOrderToPush
    if (!userOrder) {
      userOrderToPush = await Order.create({
        userId: randiUser,
        status: 'Created'
      })
    } else {
      userOrderToPush = await Order.create({
        userId: randiUser,
        status: nonCartStatus[randIndex(nonCartStatus)]
      })
    }

    let randiSesh = sessArr[randIndex(sessArr)]
    const sessOrder = await Order.findOne({
      where: {
        sid: randiSesh,
        status: 'Created'
      }
    })
    let seshOrderToPush
    if (!sessOrder) {
      seshOrderToPush = await Order.create({
        sid: randiSesh,
        status: 'Created'
      })
    } else {
      seshOrderToPush = await Order.create({
        sid: randiSesh,
        status: nonCartStatus[randIndex(nonCartStatus)]
      })
    }
    orders.push(userOrderToPush)
    orders.push(seshOrderToPush)
  }

  //create productOrder
  const prodOrd = []
  const orderArr = await Order.findAll()
  for (let i = 0; i <= 500; i++) {
    await ProductOrder.findOrCreate({
      where: {
        orderId: Math.floor(Math.random() * orderArr.length + 1),
        productId: randIndex(products) + 1
      },
      defaults: {
        price: products[randIndex(products)].price,
        quantity: Math.floor(Math.random() * 10)
      }
    })
  }

  //create reviews

  for (let i = 0; i < 1000; i++) {
    await Review.create({
      text: faker.lorem.sentences(),
      rating: Math.floor(Math.random() * 5) + 1,
      userId: randIndex(users) + 1,
      productId: randIndex(products) + 1
    })
  }

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
