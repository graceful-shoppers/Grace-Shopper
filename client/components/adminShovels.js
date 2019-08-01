import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllShovelsView extends React.Component {
  constructor() {
    super()
  }

  render() {
    const shovels = this.props.shovels

    return (
      <div className="allShovels">
        {shovels.map(shovel => {
          return (
            <div key={shovel.id}>
              <Link to={`/shovels/${shovel.id}`}>
                <div className="shovel">
                  <h3>{shovel.title}</h3>
                  <h6>{shovel.price}</h6>
                  <img src={shovel.imageUrl} />
                </div>
              </Link>
              <div>
                <Link to={`/adminPortal/editShovel/${shovel.id}`}>
                  <button type="button">Edit/Delete</button>
                </Link>
                <button type="button">Availability</button>
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

export default connect(mapState)(AllShovelsView)
