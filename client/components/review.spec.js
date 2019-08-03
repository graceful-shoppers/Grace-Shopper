/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Review from './review'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleShovel', () => {
  let review

  const props = {
    name: 'review name',
    starCount: 5,
    value: 4,
    text: 'hipster ipsum'
  }

  beforeEach(() => {
    review = shallow(<Review {...props} />)
  })

  it('renders the review text in a p', () => {
    expect(review.find('p').text()).to.be.equal('hipster ipsum')
  })
})
