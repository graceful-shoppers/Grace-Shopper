import React from 'react'
import {connect} from 'react-redux'
import {getShovel} from '../store/singleShovel'

class SingleShovel extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = document.getElementById('editForm')
    form.reset()
  }

  componentDidMount() {
    this.props.getShovel(this.props.match.params.shovelId)
  }

  render() {
    const shovel = this.props.selectedShovel
    return (
      <form id="editForm">
        <div className="shovel">
          <h3>
            {shovel.title} <input type="text" />
          </h3>
          <h6>
            ${shovel.price / 100} <input type="text" />
          </h6>
          <button type="submit" onClick={this.handleSubmit}>
            Submit Changes
          </button>
          <button type="button"> Delete </button>
          <img src={shovel.imageUrl} />
        </div>
      </form>
    )
  }
}

const mapState = state => {
  return {
    selectedShovel: state.singleShovel,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getShovel: shovelId => dispatch(getShovel(shovelId))
  }
}

export default connect(mapState, mapDispatch)(SingleShovel)
