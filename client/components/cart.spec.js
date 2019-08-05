// /* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {Cart} from './cart'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('Cart', () => {
//   let cart

//   const props = {
//     removeItem: () => {},
//     updateItem: () => {},
//     cart: {
//       id: 149,
//       subtotal: null,
//       created: '2019-08-03T16:36:52.753Z',
//       updatedAt: '2019-08-03T16:36:52.753Z',
//       userId: null,
//       sid: '_UeyOr26GTgaiyt2gvYFJ0x76-6LPp_i',
//       user: null,
//       products: [
//         {
//           id: 11,
//           title: 'cupiditate',
//           description: 'attitude oriented',
//           price: 91276,
//           quantity: 8,
//           category: ['yardShovel'],
//           availability: true,
//           imageUrl: 'http://lorempixel.com/640/480/business',
//           createdAt: '2019-08-03T01:14:01.739Z',
//           updatedAt: '2019-08-03T01:14:01.739Z',
//           product_Order: {
//             price: 91276,
//             quantity: 4
//           }
//         }
//       ]
//     }
//   }

//   beforeEach(() => {
//     cart = shallow(<Cart {...props} />)
//   })

//   it('renders the title in an h2', () => {
//     expect(cart.find('h2').text()).to.be.equal('cupiditate')
//   })
// })
