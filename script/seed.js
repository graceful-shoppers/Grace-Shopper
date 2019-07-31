'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Order,
  ProductOrder,
  Review
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'shovelknight@mailinator.com',
      password: 'ishovelforfun',
      isAdmin: false
    })
  ])

  const products = await Promise.all([
    Product.create({
      title: 'Garant Plastic 24 in. W Snow Shovel',
      price: 4999,
      category: ['snowShovel'],
      imageUrl:
        'https://hw.menardc.com/main/items/media/EMSCO001/ProductMedium/1196.jpg',
      description:
        'Deal with heavy snowfalls thanks to the Garant ergonomic 45 L sleigh shovel. Its poly scoop is reinforced with a galvanised steel wear strip that prevents premature wear. Its extra-large scoop enables you to gather a maximum amount a snow with each push. This winter tool has an ergonomic steel handle that provides better comfort and ensures maximum stability when moving a large quantity of snow. Ideal for occasional use.',
      quantity: 1
    }),
    Product.create({
      title: 'Garant Nordic Steel 24 in. W Snow Pusher',
      price: 2499,
      category: ['snowShovel'],
      imageUrl:
        'http://cdn-tp3.mozu.com/24645-37138/cms/37138/files/28541512-812d-4408-bb8b-801e7b041926?max=300&quality=40&_mzcb=_1564029509205',
      description:
        'Push away snow from large surfaces with this Garant snow pusher. Its 24 in (60.9 cm) blade is made from a single piece of high-quality steel. This snow removal tool is equipped with steel reinforcements for increased strength and rigidity. The varnished hardwood handle absorbs shock well. Designed for those who want a quality product at a competitive price, this snow pusher is ideal for removing snow from the hardest surfaces',
      quantity: 1
    }),
    Product.create({
      title: 'Suncast Plastic 4.3 ft. L x 20 in. W Snow ',
      price: 3799,
      category: ['snowShovel'],
      imageUrl:
        'http://cdn-tp3.mozu.com/24645-37138/cms/37138/files/9390bf37-f70c-4f01-9d88-05eab13636f1?max=300&quality=40&_mzcb=_1564029509205',
      description: 'super nice',
      quantity: 1
    }),
    Product.create({
      title: 'Ames True Temper Aluminum 4.33 ft. L x 18 in. W Snow Shovel',
      price: 3499,
      category: ['snowShovel'],
      imageUrl:
        'http://cdn-tp3.mozu.com/24645-37138/cms/37138/files/8a7894cc-f249-4195-8f3c-7f216ace82ac?max=300&quality=40&_mzcb=_1564029509205',
      description: 'really cool shovel',
      quantity: 1
    }),
    Product.create({
      title: 'Garant Alpine Plastic 18 in. W Snow Shovel',
      price: 500,
      category: ['snowShovel'],
      imageUrl:
        'http://cdn-tp3.mozu.com/24645-37138/cms/37138/files/a67b8879-f288-47c5-b0e9-ca9327ad736b?max=300&quality=40&_mzcb=_1564029509205',
      description: 'awesome shovel right here',
      quantity: 1
    })
  ])

  await Order.create({
    status: 'Created',
    sid: 'aa34d',
    subtotal: 10498,
    userId: 1
  })

  await Order.create({
    status: 'Processing',
    sid: 'ac345',
    subtotal: 2499,
    userId: 1
  })

  await Order.create({
    status: 'Cancelled',
    sid: 'aa334411',
    subtotal: 3799,
    userId: 1
  })

  await Order.create({
    status: 'Completed',
    sid: 'aa88i3jd',
    subtotal: 3499,
    userId: 1
  })

  await ProductOrder.create({
    price: 4999,
    quantity: 2,
    productId: 1,
    orderId: 1
  })

  await ProductOrder.create({
    price: 2499,
    quantity: 1,
    productId: 2,
    orderId: 2
  })

  await ProductOrder.create({
    price: 3799,
    quantity: 1,
    productId: 3,
    orderId: 3
  })

  await ProductOrder.create({
    price: 3499,
    quantity: 1,
    productId: 4,
    orderId: 4
  })

  await ProductOrder.create({
    price: 500,
    quantity: 1,
    productId: 5,
    orderId: 1
  })

  await Review.create({
    text: 'its really cool',
    rating: 3,
    userId: 1,
    productId: 1
  })

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
