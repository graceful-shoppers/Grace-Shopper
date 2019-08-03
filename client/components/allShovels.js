import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllShovels} from '../store/shovels'
import styled from 'styled-components'
import Review from './review'

const ShovelsCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FiltersDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Shovel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 200px;
  // background-color: lightgrey;
  border: 1px solid black;

  // border-bottom: 1px solid black;
`

const ImageDiv = styled.div`
  display; flex;
  width: 50%;
`

const InfoDiv = styled.div`
  display; flex;
  width: 50%;
`

const RatingDiv = styled.div`
  display: flex;
  flex-direction: row;
  // margin: 10px;
`

const AvgRating = props => {
  var avg = 0

  if (!props.shovel.reviews) {
    avg = 0
  } else {
    props.shovel.reviews.forEach(review => {
      avg += review.rating
    })

    avg = avg / props.shovel.reviews.length
  }

  return (
    <RatingDiv>
      <Review value={avg} />
      {props.shovel.reviews.length}
    </RatingDiv>
  )
}

class AllShovelsView extends React.Component {
  constructor() {
    super()
    this.selectShovels = this.selectShovels.bind(this)
    // this.sortBy = this.sortBy.bind(this)
  }

  componentDidMount() {
    this.props.getShovels('all')
  }

  // sortBy() {
  //   var elem = document.getElementById('typeSelect')
  //   var type = elem.options[elem.selectedIndex].value
  //   this.props.getShovels(type)
  // }

  selectShovels() {
    var elem = document.getElementById('typeSelect')
    var type = elem.options[elem.selectedIndex].value

    var elem2 = document.getElementById('sortBySelect')
    var sort = elem2.options[elem2.selectedIndex].value

    this.props.getShovels(type, sort)
  }

  render() {
    const shovels = this.props.shovels

    return (
      <ShovelsCont>
        <FiltersDiv>
          <div>
            <h6>Category:</h6>
            <select id="typeSelect" onChange={this.selectShovels}>
              <option value="all">All shovels</option>
              <option value="mouthShovel">Mouth shovels</option>
              <option value="kitchenShovel">Kitchen shovels</option>
              <option value="snowShovel">Snow shovels</option>
              <option value="yardShovel">Yard shovels</option>
            </select>
          </div>

          <div>
            <h6>Sort by:</h6>
            <select id="sortBySelect" onChange={this.selectShovels}>
              <option value="none">none</option>
              <option value="ASC">Price: low to high</option>
              <option value="DESC">Price: high to low</option>
            </select>
          </div>
        </FiltersDiv>
        <h6> Displaying {shovels.length} items</h6>

        {shovels.map(shovel => {
          return (
            <Link
              to={`/shovels/${shovel.id}`}
              style={{width: '100%', textDecoration: 'none'}}
              key={shovel.id}
            >
              <Shovel>
                <ImageDiv>
                  <img src={shovel.imageUrl} style={{width: 100}} />
                </ImageDiv>

                <InfoDiv>
                  <h3>{shovel.title}</h3>
                  <AvgRating shovel={shovel} />
                  <h6>${shovel.price / 100}</h6>
                  {Math.random() > 0.3 ? (
                    <h6>Prime Shovel shipping</h6>
                  ) : (
                    <h6>Regular shipping </h6>
                  )}
                </InfoDiv>
              </Shovel>
            </Link>
          )
        })}
      </ShovelsCont>
    )
  }
}

const mapState = state => {
  return {
    shovels: state.shovels,
    reviews: state.reviews
  }
}

const mapDispatch = dispatch => {
  return {
    getShovels: (type, sort) => dispatch(getAllShovels(type, sort))
  }
}

export default connect(mapState, mapDispatch)(AllShovelsView)
