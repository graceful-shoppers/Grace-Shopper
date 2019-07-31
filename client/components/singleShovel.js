import React from 'react'
import {connect} from 'react-redux'
import {getShovel} from '../store/singleShovel'

class SingleShovel extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getShovel(this.props.match.params.shovelId)
  }

  render() {
    const shovel = this.props.selectedShovel
    return (
      <div className="shovel">
        <div> Is showing?</div>
        <h3>{shovel.title}</h3>
        <h6>{shovel.price}</h6>
        <img src={shovel.imageUrl} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedShovel: state.singleShovel
  }
}

const mapDispatch = dispatch => {
  return {
    getShovel: shovelId => dispatch(getShovel(shovelId))
  }
}

export default connect(mapState, mapDispatch)(SingleShovel)
