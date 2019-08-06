// /* global describe beforeEach it */

// const {expect} = require('chai')
// const db = require('../index')
// const User = db.model('user')

// describe('User model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let cody

//       beforeEach(async () => {
//         cody = await User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         })
//       })

//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true)
//       })

//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false)
//       })
//     }) // end describe('correctPassword')
//   }) // end describe('instanceMethods')
//   describe('validators', () => {
//     describe('email', () => {
//       let cody
//       let brody
//       beforeEach(async () => {
//         cody = await User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         })

//         brody = {
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         }
//       })
//       it('throws an error if the email is already in the database', async () => {
//         return await User.create(brody).then(
//           () => {
//             throw new Error('validation should fail when email is not unique')
//           },
//           createdError => expect(createdError).to.be.an.instanceOf(Error)
//         )
//       })
//     })
//   })
// }) // end describe('User model')
