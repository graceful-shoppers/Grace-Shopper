import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteShovel} from '../store/shovels'

class AllShovelsView extends React.Component {
  render() {
    const shovels = this.props.shovels

    return (
      <div className="allShovels">
        {shovels.map(shovel => {
          return (
            <div key={shovel.id}>
              <Link to={`/adminPortal/editShovel/${shovel.id}`}>
                <div className="shovel">
                  <h3>{shovel.title}</h3>
                  <h6>{shovel.price}</h6>
                  <img src={shovel.imageUrl} />
                </div>
              </Link>
              <div>
                <Link to={`/adminPortal/editShovel/${shovel.id}`}>
                  <button type="button">Edit</button>
                </Link>
                <button
                  type="button"
                  onClick={() => this.props.deleteShovel(shovel.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    shovels: state.shovels
  }
}

const mapDispatch = dispatch => {
  return {
    deleteShovel: shovelId => dispatch(deleteShovel(shovelId))
  }
}

export default connect(mapState, mapDispatch)(AllShovelsView)
