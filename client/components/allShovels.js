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
            <Link to={`/shovels/${shovel.id}`} key={shovel.id}>
              <div className="shovel">
                <h3>{shovel.title}</h3>
                <h6>{shovel.price}</h6>
                <img src={shovel.imageUrl} />
              </div>
            </Link>
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
