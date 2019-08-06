import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteShovel, getAllShovels2} from '../store/shovels'
import {ShovelsCont, StyledInfiniteScroll} from './allShovels'
import styled from 'styled-components'
import {BasicButton, DeleteButton} from '../../public/styled-components/buttons'

const EachShovelDiv = styled.div`
  border: 1px solid black;
  width: 300px;
  height: 220px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
`

const ShovelImg = styled.img`
  border-radius: 10px 0px 0px 0px;
  margin: 10px;
  margin-top: 40px;
  width: 100px;
`
const ShovelLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: black;
`
const ShovelPadding = styled.div`
  padding-top: 25px;
`
const ButtonDiv = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

class AllShovelsView extends React.Component {
  constructor() {
    super()

    this.state = {
      hasMore: true
    }
  }

  componentDidMount() {
    this.props.getShovels2('all', 'all', 'none', 0)
  }

  render() {
    const shovels = this.props.shovels

    return (
      <ShovelsCont>
        <StyledInfiniteScroll
          dataLength={this.props.shovels.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {shovels.map(shovel => {
            return (
              <EachShovelDiv key={shovel.id}>
                <ShovelLink to={`/adminPortal/editShovel/${shovel.id}`}>
                  <ShovelImg src={shovel.imageUrl} />
                  <ShovelPadding>
                    <div>{shovel.title}</div>
                    <div>{shovel.price}</div>
                  </ShovelPadding>
                </ShovelLink>

                <ButtonDiv>
                  <Link to={`/adminPortal/editShovel/${shovel.id}`}>
                    <BasicButton type="button">Edit</BasicButton>
                  </Link>
                  <DeleteButton
                    type="button"
                    onClick={() => this.props.deleteShovel(shovel.id)}
                  >
                    Delete
                  </DeleteButton>
                </ButtonDiv>
              </EachShovelDiv>
            )
          })}
        </StyledInfiniteScroll>
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
    getShovels2: (title, type, sort, offset) =>
      dispatch(getAllShovels2(title, type, sort, offset)),
    deleteShovel: shovelId => dispatch(deleteShovel(shovelId))
  }
}

export default connect(mapState, mapDispatch)(AllShovelsView)
