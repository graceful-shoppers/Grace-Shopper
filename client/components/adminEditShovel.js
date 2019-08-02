import React from 'react'
import {connect} from 'react-redux'
import {getShovel, editSelectedShovel} from '../store/singleShovel'

class SingleShovel extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      price: 0,
      category: [],
      cata: '',
      availability: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCataDropdown = this.handleCataDropdown.bind(this)
    this.addCata = this.addCata.bind(this)
    this.toggleAvailability = this.toggleAvailability.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
  }

  componentDidMount() {
    this.props.getShovel(this.props.match.params.shovelId)
  }

  async addCata() {
    let newCata = this.state.cata
    await this.setState({
      category: [...this.props.selectedShovel.category, newCata]
    })
    this.handleSubmit()
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleCataDropdown(event) {
    await this.setState({
      cata: event.target.value
    })
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault()
    }
    const form = document.getElementById('editForm')
    let updatedShovel = this.props.selectedShovel
    if (this.state.title.length !== 0) {
      updatedShovel.title = this.state.title
    }
    if (this.state.price !== 0) {
      updatedShovel.price = parseInt(this.state.price)
    }
    if (this.state.category.length > updatedShovel.category.length) {
      updatedShovel.category = this.state.category
    }
    if (this.state.availability !== null) {
      updatedShovel.availability = this.state.availability
    }
    form.reset()
    this.props.editSelectedShovel(updatedShovel)
    this.props.selectedShovel.availability = !this.props.selectedShovel
      .availability
    this.forceUpdate()
  }

  toggleAvailability() {
    let status = this.props.selectedShovel.availability
    if (status) {
      this.setState({
        availability: false
      })
    } else {
      this.setState({
        availability: true
      })
    }
    this.handleSubmit()
  }

  deleteCategory(event) {
    let targetCata = event.target.value
    let updatedCategory = this.props.selectedShovel.category.filter(
      cata => cata !== targetCata
    )
    let updatedShovel = this.props.selectedShovel
    updatedShovel.category = updatedCategory
    this.props.editSelectedShovel(updatedShovel)
    this.forceUpdate()
  }

  render() {
    const shovel = this.props.selectedShovel
    return (
      <form id="editForm">
        <div className="shovel">
          <h1>
            Product is {shovel.availability ? 'Available' : 'Unavailable'}
            <button type="button" onClick={this.toggleAvailability}>
              Change
            </button>
          </h1>
          <h3>
            {shovel.title}{' '}
            <input type="text" name="title" onChange={this.handleChange} />
          </h3>
          <h6>
            ${shovel.price / 100}{' '}
            <input type="text" name="price" onChange={this.handleChange} />
          </h6>
          <ul id="cataList">
            {' '}
            Categories{' '}
            {shovel.category &&
              shovel.category.map(cata => {
                return (
                  <li key={cata}>
                    {cata}
                    <button
                      value={cata}
                      type="button"
                      onClick={this.deleteCategory}
                    >
                      Delete
                    </button>
                  </li>
                )
              })}
            <select onChange={this.handleCataDropdown}>
              <option value="">Select Category</option>
              <option value="mouthShovel">mouthShovel</option>
              <option value="kitchenShovel">kitchenShovel</option>
              <option value="yardShovel">yardShovel</option>
              <option value="snowShovel">snowShovel</option>
            </select>
            <button type="button" onClick={() => this.addCata()}>
              Add
            </button>
          </ul>
          <button type="submit" onClick={this.handleSubmit}>
            Submit Changes
          </button>
          <hr />
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
