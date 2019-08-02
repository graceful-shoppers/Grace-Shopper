import React from 'react'
import {connect} from 'react-redux'
import {getShovel, editSelectedShovel} from '../store/singleShovel'

class SingleShovel extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      price: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = document.getElementById('editForm')
    let updatedShovel = this.props.selectedShovel
    if (this.state.title.length !== 0) {
      updatedShovel.title = this.state.title
    }
    if (this.state.price !== 0) {
      updatedShovel.price = parseInt(this.state.price)
    }
    form.reset()
    this.props.editSelectedShovel(updatedShovel)
    this.forceUpdate()
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
            {shovel.title}{' '}
            <input type="text" name="title" onChange={this.handleChange} />
          </h3>
          <h6>
            ${shovel.price / 100}{' '}
            <input type="text" name="price" onChange={this.handleChange} />
          </h6>
          <button type="submit" onClick={this.handleSubmit}>
            Submit Changes
          </button>
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
    getShovel: shovelId => dispatch(getShovel(shovelId)),
    editSelectedShovel: shovelId => dispatch(editSelectedShovel(shovelId))
  }
}

export default connect(mapState, mapDispatch)(SingleShovel)
