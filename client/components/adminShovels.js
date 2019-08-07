import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteShovel, getAllShovels2, postShovel} from '../store/shovels'
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
const ShovelCard = styled(ShovelsCont)`
  padding-top: 100px;
`

const CreateShovelForm = styled.form`
  border: 1px solid black;
  width: 300px;
  height: 220px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FormInput = styled.input`
  font-size: 15px;
  background-color: lightgray;
`

class AllShovelsView extends React.Component {
  constructor() {
    super()

    this.state = {
      hasMore: true,
      title: '',
      description: '',
      price: '',
      quantity: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getShovels2('all', 'all', 'none', 0)
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    let newShovel = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      imageUrl:
        'https://previews.123rf.com/images/lineartestpilot/lineartestpilot1803/lineartestpilot180309130/96639638-cartoon-shovel.jpg'
    }
    this.props.postShovel(newShovel)
  }

  render() {
    const shovels = this.props.shovels
    return (
      <ShovelCard>
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
        <CreateShovelForm>
          <div>
            Title<FormInput
              type="text"
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div>
            Description<FormInput
              type="text"
              name="description"
              onChange={this.handleChange}
            />
          </div>
          <div>
            Price<FormInput
              type="text"
              name="price"
              onChange={this.handleChange}
            />
          </div>
          <div>
            Quantity<FormInput
              type="text"
              name="quantity"
              onChange={this.handleChange}
            />
          </div>
          <BasicButton type="submit" onClick={() => this.handleSubmit}>
            Submit
          </BasicButton>
        </CreateShovelForm>
      </ShovelCard>
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
    deleteShovel: shovelId => dispatch(deleteShovel(shovelId)),
    postShovel: shovel => dispatch(postShovel(shovel))
  }
}

export default connect(mapState, mapDispatch)(AllShovelsView)
