import React from 'react'
import {connect} from 'react-redux'

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
            <div className="shovel">
              <h3>{shovel.title}</h3>
              <h6>${shovel.price / 100}</h6>
              <img src={shovel.imageUrl} />
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
