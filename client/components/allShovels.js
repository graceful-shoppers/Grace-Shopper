import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllShovels} from '../store/shovels'
import styled from 'styled-components'

const ShovelsCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class AllShovelsView extends React.Component {
  constructor() {
    super()
    this.selectShovels = this.selectShovels.bind(this)
  }

  componentDidMount() {
    this.props.getShovels('all')
  }

  selectShovels() {
    var elem = document.getElementById('typeSelect')
    var type = elem.options[elem.selectedIndex].value
    this.props.getShovels(type)
  }

  render() {
    const shovels = this.props.shovels

    return (
      <ShovelsCont>
        <div>
          <h4>Category:</h4>
          <select id="typeSelect" onChange={this.selectShovels}>
            <option value="all">All shovels</option>
            <option value="mouthShovel">Mouth shovels</option>
            <option value="kitchenShovel">Kitchen shovels</option>
            <option value="snowShovel">Snow shovels</option>
            <option value="yardShovel">Yard shovels</option>
          </select>
          <h6> Displaying {shovels.length} items</h6>
        </div>

        {shovels.map(shovel => {
          return (
            <Link to={`/shovels/${shovel.id}`} key={shovel.id}>
              <div className="shovel">
                <h3>{shovel.title}</h3>
                <h6>${shovel.price / 100}</h6>
                <img src={shovel.imageUrl} style={{width: 100}} />
              </div>
            </Link>
          )
        })}
      </ShovelsCont>
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
    getShovels: type => dispatch(getAllShovels(type))
  }
}

export default connect(mapState, mapDispatch)(AllShovelsView)
