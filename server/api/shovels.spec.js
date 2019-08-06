/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

xdescribe('Shovel routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('/api/shovels/', () => {
    const Shovel1 = {
      title: 'good shovel',
      description: "it's seriously good, I'm not kidding",
      price: 123456,
      quantity: 1337,
      category: ['snowShovel'],
      availability: true,
      imageUrl: 'http://lorempixel.com/640/480/people'
    }

    const Shovel2 = {
      title: 'bad shovel',
      description: "it's seriously bad, I'm not kidding",
      price: 84723,
      quantity: 9328,
      category: ['yardShovel'],
      availability: true,
      imageUrl: 'http://lorempixel.com/640/480/people'
    }

    beforeEach(async () => {
      await Product.create(Shovel1)
      return Product.create(Shovel2)
    })

    xit('GET /api/shovels/:id', async () => {
      const res = await request(app)
        .get('/api/shovels/1')
        .expect(200)

      expect(res.body.title).to.be.equal('good shovel')
    })
    xit('GET /api/shovels/get/:type', async () => {
      const res = await request(app)
        .get('/api/shovels/get/all')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('good shovel')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
