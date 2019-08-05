// /* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {SingleShovel} from './singleShovel'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('SingleShovel', () => {
//   let singleShovel

//   const props = {
//     getShovel: () => {},
//     getAllReviews: () => {},
//     selectedShovel: {
//       title: 'TITLE',
//       price: 1337,
//       imageUrl: 'google.com',
//       description: 'description'
//     },
//     reviews: [
//       {
//         id: 363,
//         text:
//           'Vel molestiae facere nisi. Vero sed tempore vitae quam et reprehenderit omnis. Voluptatem deleniti labore in doloribus aut iste ut est. Aperiam eos officiis qui asperiores est. Sit iusto exercitationem. Facilis nihil libero repudiandae.',
//         rating: 2,
//         createdAt: '2019-08-03T01:14:03.258Z',
//         updatedAt: '2019-08-03T01:14:03.258Z',
//         userId: 3,
//         productId: 11
//       }
//     ]
//   }
//   const match = {
//     params: {
//       shovelId: 1
//     }
//   }
//   beforeEach(() => {
//     singleShovel = shallow(<SingleShovel {...props} match={match} />)
//   })

//   it('renders price in an h6', () => {
//     expect(singleShovel.find('h6').text()).to.be.equal('$13.37')
//   })
// })
